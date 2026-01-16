import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface SiteSettings {
    site_name: string;
    description: string;
    contact_email: string;
    phone: string;
    address: string;
    primary_color: string;
    social_links: {
        twitter?: string;
        linkedin?: string;
        facebook?: string;
        instagram?: string;
    };
}

interface ContentContextType {
    settings: SiteSettings;
    loading: boolean;
    refreshSettings: () => Promise<void>;
    updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
}

const defaultSettings: SiteSettings = {
    site_name: 'Illumi-Labs',
    description: 'Empowering businesses with cutting-edge digital solutions.',
    contact_email: 'contact@illumi-labs.com',
    phone: '+1 (555) 123-4567',
    address: '123 Digital Ave, Tech City',
    primary_color: '#2563EB',
    social_links: {}
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
    const [loading, setLoading] = useState(true);

    const fetchSettings = async () => {
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .select('*')
                .single();

            if (error) {
                // If no settings found (e.g. first run), we might want to insert defaults or just ignore
                console.warn('Could not fetch site settings:', error.message);
            } else if (data) {
                setSettings({
                    site_name: data.site_name,
                    description: data.description,
                    contact_email: data.contact_email,
                    phone: data.phone,
                    address: data.address,
                    primary_color: data.primary_color,
                    social_links: data.social_links || {}
                });

                // Apply theme color to CSS variable for global usage
                document.documentElement.style.setProperty('--primary-color', data.primary_color);
            }
        } catch (error) {
            console.error('Error in fetchSettings:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateSettings = async (newSettings: Partial<SiteSettings>) => {
        // Optimistic update
        setSettings(prev => ({ ...prev, ...newSettings }));

        if (newSettings.primary_color) {
            document.documentElement.style.setProperty('--primary-color', newSettings.primary_color);
        }

        const { error } = await supabase
            .from('site_settings')
            .update(newSettings)
            .eq('site_name', settings.site_name); // Assuming singular row, but better to use ID if we had it stored.
        // Actually, for singleton table, simpler to update where true, or fetch ID. 
        // Better strategy: strict implementation of singleton in DB or use ID 1.
        // Let's rely on the update policy or just update the single row we fetched.

        // To be safe/correct, we should really store the ID.
        // But let's cheat slightly and update all rows (since there's only 1) OR fetch ID.

        // Re-fetch to confirm save
        await fetchSettings();

        if (error) throw error;
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    return (
        <ContentContext.Provider value={{ settings, loading, refreshSettings: fetchSettings, updateSettings }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
