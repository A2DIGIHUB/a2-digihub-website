import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

export interface Notification {
    id: string;
    user_id: string;
    message: string;
    is_read: boolean;
    type: 'info' | 'success' | 'warning' | 'error';
    created_at: string;
}

interface NotificationsContextType {
    notifications: Notification[];
    unreadCount: number;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    addNotification: (type: Notification['type'], message: string) => Promise<void>;
    loading: boolean;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setNotifications([]);
            setLoading(false);
            return;
        }

        // Fetch initial notifications
        const fetchNotifications = async () => {
            const { data, error } = await supabase
                .from('notifications')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) console.error('Error fetching notifications:', error);
            else setNotifications(data || []);
            setLoading(false);
        };

        fetchNotifications();

        // Subscribe to real-time changes
        const subscription = supabase
            .channel('public:notifications')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'notifications',
                    filter: `user_id=eq.${user.id}`,
                },
                (payload) => {
                    const newNotification = payload.new as Notification;
                    setNotifications((prev) => [newNotification, ...prev]);

                    // Optional: Play a sound or show a toast here
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [user]);

    const markAsRead = async (id: string) => {
        // Optimistic update
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
        );

        const { error } = await supabase
            .from('notifications')
            .update({ is_read: true })
            .eq('id', id);

        if (error) console.error('Error marking notification as read:', error);
    };

    const markAllAsRead = async () => {
        // Optimistic update
        setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));

        const { error } = await supabase
            .from('notifications')
            .update({ is_read: true })
            .eq('user_id', user?.id);

        if (error) console.error('Error marking all as read:', error);
    };

    const addNotification = async (type: Notification['type'], message: string) => {
        if (!user) return;

        // Optimistic update
        const newNotification: Notification = {
            id: Math.random().toString(36).substring(7), // Temp ID
            user_id: user.id,
            message,
            is_read: false,
            type,
            created_at: new Date().toISOString(),
        };

        setNotifications((prev) => [newNotification, ...prev]);

        const { error } = await supabase
            .from('notifications')
            .insert({
                user_id: user.id,
                message,
                type,
            });

        if (error) {
            console.error('Error adding notification:', error);
            // Revert optimistic update if needed, but usually fine to leave or just console error
        }
    };

    const unreadCount = notifications.filter((n) => !n.is_read).length;

    return (
        <NotificationsContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification, loading }}>
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationsContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationsProvider');
    }
    return context;
};
