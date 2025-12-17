import React, { useEffect, useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import {
    ArrowTrendingUpIcon,
    UsersIcon,
    CurrencyDollarIcon,
    ClockIcon
} from '@heroicons/react/24/outline';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics: React.FC = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalQuotes: 0,
        pendingQuotes: 0,
        approvedValue: 0,
        conversionRate: 0
    });
    const [chartData, setChartData] = useState<any[]>([]);
    const [serviceData, setServiceData] = useState<any[]>([]);

    useEffect(() => {
        if (user) {
            fetchAnalytics();
        }
    }, [user]);

    const fetchAnalytics = async () => {
        try {
            // Fetch all quotes for this user
            const { data: quotes, error } = await supabase
                .from('quotes')
                .select('*')
                .eq('user_id', user?.id)
                .order('created_at', { ascending: true });

            if (error) throw error;

            if (quotes) {
                // Calculate KPIs
                const total = quotes.length;
                const pending = quotes.filter(q => q.status === 'pending').length;
                const approved = quotes.filter(q => q.status === 'approved');

                // Parse estimates (e.g. "$1,200" -> 1200)
                const revenue = approved.reduce((acc, curr) => {
                    const val = parseFloat(curr.estimated_price.replace(/[^0-9.]/g, ''));
                    return acc + (isNaN(val) ? 0 : val);
                }, 0);

                setStats({
                    totalQuotes: total,
                    pendingQuotes: pending,
                    approvedValue: revenue,
                    conversionRate: total > 0 ? (approved.length / total) * 100 : 0
                });

                // Process Chart Data (Group by Month)
                const monthlyData = quotes.reduce((acc: any, curr) => {
                    const month = new Date(curr.created_at).toLocaleString('default', { month: 'short' });
                    if (!acc[month]) acc[month] = { name: month, quotes: 0, value: 0 };

                    const val = parseFloat(curr.estimated_price.replace(/[^0-9.]/g, ''));
                    acc[month].quotes += 1;
                    acc[month].value += (isNaN(val) ? 0 : val);

                    return acc;
                }, {});
                setChartData(Object.values(monthlyData));

                // Process Service Distribution
                const services = quotes.reduce((acc: any, curr) => {
                    const service = curr.service_type || 'Other';
                    if (!acc[service]) acc[service] = 0;
                    acc[service] += 1;
                    return acc;
                }, {});

                setServiceData(Object.keys(services).map(key => ({
                    name: key,
                    value: services[key]
                })));
            }
        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading analytics...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Performance Analytics</h1>
                    <p className="text-gray-500 dark:text-gray-400">Real-time insights based on your projects</p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: 'Total Projects', value: stats.totalQuotes, icon: UsersIcon, color: 'blue' },
                    { title: 'Pending Approval', value: stats.pendingQuotes, icon: ClockIcon, color: 'yellow' },
                    { title: 'Est. Project Value', value: `$${stats.approvedValue.toLocaleString()}`, icon: CurrencyDollarIcon, color: 'green' },
                    { title: 'Approval Rate', value: `${stats.conversionRate.toFixed(1)}%`, icon: ArrowTrendingUpIcon, color: 'purple' },
                ].map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</h3>
                            </div>
                            <div className={`p-2 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quotes & Value Trend */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Project Value Trends</h3>
                    <div className="h-80">
                        {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                                    <XAxis dataKey="name" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-400">Not enough data yet</div>
                        )}
                    </div>
                </div>

                {/* Service Distribution Pie Chart */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Service Distribution</h3>
                    <div className="h-80 flex items-center justify-center">
                        {serviceData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={serviceData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {serviceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="text-gray-400">No projects to analyze</div>
                        )}
                    </div>
                    <div className="flex justify-center gap-6 mt-4 flex-wrap">
                        {serviceData.map((entry, index) => (
                            <div key={index} className="flex items-center">
                                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">{entry.name} ({entry.value})</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
