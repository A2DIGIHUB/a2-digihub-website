// Project Status System Types and Utilities

export type ProjectStatus =
    | 'pending'
    | 'under_review'
    | 'approved'
    | 'in_progress'
    | 'in_development'
    | 'testing'
    | 'ready_for_delivery'
    | 'delivered'
    | 'completed'
    | 'rejected'
    | 'on_hold';

export type ActivityType =
    | 'status_change'
    | 'comment'
    | 'file_upload'
    | 'milestone_completed'
    | 'deadline_updated'
    | 'progress_update';

export interface ProjectActivity {
    id: string;
    quote_id: string;
    activity_type: ActivityType;
    description: string;
    created_by?: string;
    created_at: string;
    metadata?: Record<string, any>;
    profile?: {
        full_name?: string;
        email?: string;
        avatar_url?: string;
    };
}

export interface ProjectMilestone {
    id: string;
    quote_id: string;
    title: string;
    description?: string;
    due_date?: string;
    completed_at?: string;
    order_index: number;
    created_at: string;
}

export interface EnhancedQuote {
    id: string;
    created_at: string;
    user_id: string;
    service_type: string;
    package_type?: string;
    estimated_price?: string;
    timeline?: string;
    status: ProjectStatus;
    details?: Record<string, any>;
    progress_percentage: number;
    current_milestone?: string;
    estimated_completion?: string;
    started_at?: string;
    completed_at?: string;
    notes?: string;
    profiles?: {
        email?: string;
        full_name?: string;
        avatar_url?: string;
    };
}

// Status configuration with colors, icons, and descriptions
export const STATUS_CONFIG: Record<
    ProjectStatus,
    {
        label: string;
        color: string;
        bgColor: string;
        darkBgColor: string;
        description: string;
        progress: number;
    }
> = {
    pending: {
        label: 'Pending Review',
        color: 'text-yellow-800 dark:text-yellow-300',
        bgColor: 'bg-yellow-100',
        darkBgColor: 'dark:bg-yellow-900/30',
        description: 'Awaiting admin review',
        progress: 5,
    },
    under_review: {
        label: 'Under Review',
        color: 'text-blue-800 dark:text-blue-300',
        bgColor: 'bg-blue-100',
        darkBgColor: 'dark:bg-blue-900/30',
        description: 'Admin is reviewing requirements',
        progress: 15,
    },
    approved: {
        label: 'Approved',
        color: 'text-green-800 dark:text-green-300',
        bgColor: 'bg-green-100',
        darkBgColor: 'dark:bg-green-900/30',
        description: 'Project accepted, awaiting start',
        progress: 25,
    },
    in_progress: {
        label: 'In Progress',
        color: 'text-indigo-800 dark:text-indigo-300',
        bgColor: 'bg-indigo-100',
        darkBgColor: 'dark:bg-indigo-900/30',
        description: 'Gathering requirements and planning',
        progress: 35,
    },
    in_development: {
        label: 'In Development',
        color: 'text-purple-800 dark:text-purple-300',
        bgColor: 'bg-purple-100',
        darkBgColor: 'dark:bg-purple-900/30',
        description: 'Active development phase',
        progress: 60,
    },
    testing: {
        label: 'Testing',
        color: 'text-orange-800 dark:text-orange-300',
        bgColor: 'bg-orange-100',
        darkBgColor: 'dark:bg-orange-900/30',
        description: 'Quality assurance and testing',
        progress: 80,
    },
    ready_for_delivery: {
        label: 'Ready for Delivery',
        color: 'text-teal-800 dark:text-teal-300',
        bgColor: 'bg-teal-100',
        darkBgColor: 'dark:bg-teal-900/30',
        description: 'Awaiting client review',
        progress: 90,
    },
    delivered: {
        label: 'Delivered',
        color: 'text-cyan-800 dark:text-cyan-300',
        bgColor: 'bg-cyan-100',
        darkBgColor: 'dark:bg-cyan-900/30',
        description: 'Handed over to client',
        progress: 95,
    },
    completed: {
        label: 'Completed',
        color: 'text-green-800 dark:text-green-300',
        bgColor: 'bg-green-100',
        darkBgColor: 'dark:bg-green-900/30',
        description: 'Project successfully completed',
        progress: 100,
    },
    rejected: {
        label: 'Rejected',
        color: 'text-red-800 dark:text-red-300',
        bgColor: 'bg-red-100',
        darkBgColor: 'dark:bg-red-900/30',
        description: 'Project declined',
        progress: 0,
    },
    on_hold: {
        label: 'On Hold',
        color: 'text-gray-800 dark:text-gray-300',
        bgColor: 'bg-gray-100',
        darkBgColor: 'dark:bg-gray-900/30',
        description: 'Temporarily paused',
        progress: 0,
    },
};

// Activity type configuration
export const ACTIVITY_CONFIG: Record<
    ActivityType,
    {
        label: string;
        icon: string;
        color: string;
    }
> = {
    status_change: {
        label: 'Status Update',
        icon: '🔄',
        color: 'text-blue-600 dark:text-blue-400',
    },
    comment: {
        label: 'Comment',
        icon: '💬',
        color: 'text-gray-600 dark:text-gray-400',
    },
    file_upload: {
        label: 'File Upload',
        icon: '📎',
        color: 'text-purple-600 dark:text-purple-400',
    },
    milestone_completed: {
        label: 'Milestone',
        icon: '🎯',
        color: 'text-green-600 dark:text-green-400',
    },
    deadline_updated: {
        label: 'Deadline',
        icon: '📅',
        color: 'text-orange-600 dark:text-orange-400',
    },
    progress_update: {
        label: 'Progress',
        icon: '📊',
        color: 'text-indigo-600 dark:text-indigo-400',
    },
};

// Utility functions
export const getStatusConfig = (status: ProjectStatus) => {
    return STATUS_CONFIG[status] || STATUS_CONFIG.pending;
};

export const getActivityConfig = (type: ActivityType) => {
    return ACTIVITY_CONFIG[type] || ACTIVITY_CONFIG.comment;
};

export const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const getRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
};

export const calculateEstimatedCompletion = (
    timeline: string,
    startDate: Date = new Date()
): Date => {
    const daysMap: Record<string, number> = {
        urgent: 7,
        standard: 14,
        flexible: 30,
    };

    const days = daysMap[timeline.toLowerCase()] || 14;
    const completion = new Date(startDate);
    completion.setDate(completion.getDate() + days);
    return completion;
};

export const getProgressColor = (progress: number): string => {
    if (progress < 25) return 'bg-red-500';
    if (progress < 50) return 'bg-yellow-500';
    if (progress < 75) return 'bg-blue-500';
    return 'bg-green-500';
};

// Status transition validation
export const canTransitionTo = (
    currentStatus: ProjectStatus,
    newStatus: ProjectStatus
): boolean => {
    const transitions: Record<ProjectStatus, ProjectStatus[]> = {
        pending: ['under_review', 'rejected'],
        under_review: ['approved', 'rejected', 'pending'],
        approved: ['in_progress', 'on_hold'],
        in_progress: ['in_development', 'on_hold'],
        in_development: ['testing', 'on_hold'],
        testing: ['ready_for_delivery', 'in_development', 'on_hold'],
        ready_for_delivery: ['delivered', 'testing', 'on_hold'],
        delivered: ['completed', 'testing'],
        completed: [],
        rejected: [],
        on_hold: ['in_progress', 'in_development', 'testing'],
    };

    return transitions[currentStatus]?.includes(newStatus) || false;
};
