import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationsContext';
import {
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    EllipsisHorizontalIcon,
    CalendarIcon,
    UserIcon,
    CurrencyDollarIcon
} from '@heroicons/react/24/outline';

interface ProjectRequest {
    id: string;
    service_type: string;
    package_type: string;
    estimated_price: string;
    timeline: string;
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    details: any;
    created_at: string;
    user_id: string; // To check ownership if needed
}

// Columns configuration
const columns = {
    pending: { id: 'pending', title: 'Pending Review', color: 'bg-yellow-100 text-yellow-800' },
    approved: { id: 'approved', title: 'In Progress', color: 'bg-blue-100 text-blue-800' },
    completed: { id: 'completed', title: 'Completed', color: 'bg-green-100 text-green-800' },
    rejected: { id: 'rejected', title: 'Rejected', color: 'bg-red-100 text-red-800' },
};

const ProjectBoard: React.FC = () => {
    const { user, isAdmin } = useAuth(); // isAdmin from context
    const { addNotification } = useNotifications();
    const [tasks, setTasks] = useState<ProjectRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, [user]);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            // Admins see all, users see their own (handled by RLS automatically if configured right, 
            // but let's be explicit if needed, though 'select *' with RLS is best practice)
            const { data, error } = await supabase
                .from('quotes')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setTasks(data || []);
        } catch (error: any) {
            addNotification('error', `Failed to load projects: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const onDragEnd = async (result: DropResult) => {
        if (!isAdmin) return; // Prevent non-admins from triggering updates even if UI allowed it

        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newStatus = destination.droppableId as ProjectRequest['status'];

        // Optimistic UI update
        const updatedTasks = tasks.map(task =>
            task.id === draggableId ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);

        try {
            const { error } = await supabase
                .from('quotes') // Using 'quotes' table
                .update({ status: newStatus })
                .eq('id', draggableId);

            if (error) throw error;
            addNotification('success', 'Project status updated');
        } catch (error: any) {
            addNotification('error', 'Failed to update status');
            fetchTasks(); // Revert on error
        }
    };

    // Filter tasks by column
    const getTasksByStatus = (status: string) => tasks.filter(task => task.status === status);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading project board...</div>;

    return (
        <div className="h-full flex flex-col">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Project Board</h1>
                    <p className="text-sm text-gray-500">
                        {isAdmin
                            ? "Manage all client project requests."
                            : "Track the status of your project requests."}
                    </p>
                </div>
                {!isAdmin && (
                    <div className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                        Read Only View
                    </div>
                )}
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex-1 overflow-x-auto overflow-y-hidden">
                    <div className="flex gap-6 h-full min-w-[1000px] pb-4">
                        {Object.values(columns).map((column) => (
                            <div key={column.id} className="w-80 flex-shrink-0 flex flex-col">
                                <div className={`flex items-center justify-between p-3 rounded-t-xl font-semibold text-sm ${column.color.split(' ')[0]} ${column.color.split(' ')[1]}`}>
                                    <span>{column.title}</span>
                                    <span className="bg-white/50 px-2 py-0.5 rounded-full text-xs">
                                        {getTasksByStatus(column.id).length}
                                    </span>
                                </div>
                                <div className="bg-gray-50/50 border border-gray-100 rounded-b-xl flex-1 p-2">
                                    {/* 
                                        Only enable Droppable if Admin. 
                                        Actually, DragDropContext handles the logic, but disabling Droppable 
                                        visually reinforces it. However, dnd lib allows dropping even if we 
                                        don't check isAdmin here, so we must disable individual Draggables.
                                    */}
                                    <Droppable droppableId={column.id} isDropDisabled={!isAdmin}>
                                        {(provided) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className="h-full min-h-[100px] flex flex-col gap-3"
                                            >
                                                {getTasksByStatus(column.id).map((task, index) => (
                                                    <Draggable
                                                        key={task.id}
                                                        draggableId={task.id}
                                                        index={index}
                                                        isDragDisabled={!isAdmin} // Crucial: Users cannot drag
                                                    >
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 
                                                                    ${snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500 rotate-2' : 'hover:shadow-md'} 
                                                                    transition-all cursor-pointer`}
                                                            >
                                                                <div className="flex justify-between items-start mb-2">
                                                                    <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-600">
                                                                        {task.service_type}
                                                                    </span>
                                                                    {/* Admin Menu (could add later) */}
                                                                </div>

                                                                <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                                                                    {task.package_type || task.service_type}
                                                                </h3>

                                                                <div className="flex items-center text-xs text-gray-500 mb-3">
                                                                    <ClockIcon className="w-3 h-3 mr-1" />
                                                                    {task.timeline}
                                                                </div>

                                                                <div className="border-t border-gray-100 pt-3 mt-2 flex items-center justify-between text-xs">
                                                                    <div className="flex items-center font-medium text-gray-900">
                                                                        <CurrencyDollarIcon className="w-3 h-3 mr-1 text-gray-400" />
                                                                        {task.estimated_price}
                                                                    </div>
                                                                    <div className="text-gray-400">
                                                                        {new Date(task.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DragDropContext>
        </div>
    );
};

export default ProjectBoard;
