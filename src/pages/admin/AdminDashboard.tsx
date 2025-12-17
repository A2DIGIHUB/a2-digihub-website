import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    const { isAdmin, loading: authLoading } = useAuth();
    const [quotes, setQuotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAdmin) {
            fetchAllQuotes();
        }
    }, [isAdmin]);

    const fetchAllQuotes = async () => {
        try {
            const { data, error } = await supabase
                .from('quotes')
                .select(`
          *,
          profiles:user_id (email, full_name)
        `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setQuotes(data || []);
        } catch (error) {
            console.error('Error fetching quotes:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const { error } = await supabase
                .from('quotes')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            // Optimistic update
            setQuotes(quotes.map(q => q.id === id ? { ...q, status: newStatus } : q));
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    if (authLoading) return <div>Loading...</div>;
    if (!isAdmin) return <Navigate to="/dashboard" replace />;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">All Project Requests</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage incoming leads and quotes.</p>
                </div>
                <div className="border-t border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Client
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Service
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center">Loading...</td>
                                </tr>
                            ) : quotes.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center">No quotes found.</td>
                                </tr>
                            ) : quotes.map((quote) => (
                                <tr key={quote.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="ml-0">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {quote.profiles?.full_name || 'Unknown'}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {quote.profiles?.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{quote.service_type}</div>
                                        <div className="text-sm text-gray-500">{quote.package_type}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {quote.estimated_price}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${quote.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                quote.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {quote.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <button
                                            onClick={() => updateStatus(quote.id, 'approved')}
                                            className="text-green-600 hover:text-green-900"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => updateStatus(quote.id, 'rejected')}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
