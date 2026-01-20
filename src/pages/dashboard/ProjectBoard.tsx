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
import ProjectDetailModal from '../../components/ProjectDetailModal';



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
    pending: { id: 'pending', title: 'Pending Review', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20 dark:border' },
    approved: { id: 'approved', title: 'In Progress', color: 'bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20 dark:border' },
    completed: { id: 'completed', title: 'Completed', color: 'bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20 dark:border' },
    rejected: { id: 'rejected', title: 'Rejected', color: 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20 dark:border' },
};

const ProjectBoard: React.FC = () => {
    const { user, isAdmin } = useAuth(); // isAdmin from context
    const { addNotification } = useNotifications();
    const [tasks, setTasks] = useState<ProjectRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                                <div className={`flex items-center justify-between p-3 rounded-t-2xl font-semibold text-sm backdrop-blur-md ${column.color}`}>
                                    <span>{column.title}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-xs bg-white/50 dark:bg-black/20 text-current`}>
                                        {getTasksByStatus(column.id).length}
                                    </span>
                                </div>
                                <Droppable droppableId={column.id}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={`bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-b-3xl flex-1 p-2 backdrop-blur-sm transition-colors ${snapshot.isDraggingOver ? 'bg-blue-50/80 dark:bg-blue-500/10 ring-2 ring-blue-500/20' : ''}`}
                                        >
                                            <div className="flex flex-col gap-3 min-h-[100px]">
                                                {getTasksByStatus(column.id).map((task, index) => (
                                                    <Draggable
                                                        key={task.id}
                                                        draggableId={task.id}
                                                        index={index}
                                                        isDragDisabled={!isAdmin}
                                                    >
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={{
                                                                    ...provided.draggableProps.style,
                                                                    opacity: snapshot.isDragging ? 0.9 : 1,
                                                                }}
                                                                onClick={() => {
                                                                    if (!snapshot.isDragging) {
                                                                        setSelectedProjectId(task.id);
                                                                        setIsModalOpen(true);
                                                                    }
                                                                }}
                                                                className={`glass-card p-4 hover:border-ios-blue/50 cursor-pointer group ${snapshot.isDragging ? 'shadow-2xl ring-2 ring-ios-blue rotate-2 z-50' : ''}`}
                                                            >
                                                                <div className="flex justify-between items-start mb-2">
                                                                    <span className="text-xs font-medium px-2 py-1 rounded-md bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                                                                        {task.service_type}
                                                                    </span>
                                                                </div>

                                                                <h3 className="text-sm font-semibold text-ios-text mb-1 line-clamp-2 group-hover:text-ios-blue transition-colors">
                                                                    {task.package_type || task.service_type}
                                                                </h3>

                                                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                                                                    <ClockIcon className="w-3 h-3 mr-1" />
                                                                    {task.timeline}
                                                                </div>

                                                                <div className="border-t border-gray-100 dark:border-white/10 pt-3 mt-2 flex items-center justify-between text-xs">
                                                                    <div className="flex items-center font-medium text-gray-900 dark:text-gray-200">
                                                                        <CurrencyDollarIcon className="w-3 h-3 mr-1 text-gray-400" />
                                                                        {task.estimated_price}
                                                                    </div>
                                                                    <div className="text-gray-400 dark:text-gray-500">
                                                                        {new Date(task.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        ))}
                    </div>
                </div>
            </DragDropContext>

            {selectedProjectId && (
                <ProjectDetailModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedProjectId(null);
                    }}
                    projectId={selectedProjectId}
                />
            )}
        </div>
    );
};

export default ProjectBoard;
