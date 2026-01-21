import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme === 'dark'
                ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700 focus:ring-slate-500'
                : 'bg-purple-100 text-purple-600 hover:bg-purple-200 focus:ring-purple-500'
                }`}
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? (
                <SunIcon className="w-5 h-5" />
            ) : (
                <MoonIcon className="w-5 h-5" />
            )}
        </button>
    );
};

export default ThemeToggle;
