import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorFallback from './components/common/ErrorFallback';
import { initializeMonitoring } from './utils/monitoring';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationsProvider } from './contexts/NotificationsContext';
import { ContentProvider } from './contexts/ContentContext';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Services = React.lazy(() => import('./pages/Services'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Terms = React.lazy(() => import('./pages/Terms'));
const Courses = React.lazy(() => import('./pages/Courses'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const Blogs = React.lazy(() => import('./pages/Blogs'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const DashboardLayout = React.lazy(() => import('./layouts/DashboardLayout'));
const UserDashboard = React.lazy(() => import('./pages/dashboard/UserDashboard'));
const ProjectBoard = React.lazy(() => import('./pages/dashboard/ProjectBoard'));
const Analytics = React.lazy(() => import('./pages/dashboard/Analytics'));
const Team = React.lazy(() => import('./pages/dashboard/Team'));
const Profile = React.lazy(() => import('./pages/dashboard/Profile'));
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const UserManagement = React.lazy(() => import('./pages/admin/UserManagement'));
const SiteSettings = React.lazy(() => import('./pages/admin/SiteSettings'));
const ContentManager = React.lazy(() => import('./pages/admin/ContentManager'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const SignUp = React.lazy(() => import('./pages/auth/SignUp'));

// Initialize performance monitoring
initializeMonitoring();

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <ContentProvider>
          <NotificationsProvider>
            <Router>
              <AnimatePresence mode="wait">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    {/* Public routes with Layout */}
                    <Route element={<Layout><Outlet /></Layout>}>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/portfolio" element={<Portfolio />} />
                      <Route path="/blog" element={<Blogs />} />
                      <Route path="/blog/:slug" element={<BlogPost />} />
                      <Route path="/courses" element={<Courses />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/terms" element={<Terms />} />
                    </Route>

                    {/* Auth pages (NO layout) */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />

                    {/* Protected Dashboard Routes (NO public layout) */}
                    <Route path="/dashboard" element={<DashboardLayout />}>
                      <Route index element={<UserDashboard />} />
                      <Route path="projects" element={<ProjectBoard />} />
                      <Route path="analytics" element={<Analytics />} />
                      <Route path="team" element={<Team />} />
                      <Route path="profile" element={<Profile />} />
                    </Route>

                    {/* Admin Routes (NO public layout) */}
                    <Route path="/admin" element={<DashboardLayout />}>
                      <Route index element={<AdminDashboard />} />
                      <Route path="projects" element={<ProjectBoard />} />
                      <Route path="users" element={<UserManagement />} />
                      <Route path="content" element={<ContentManager />} />
                      <Route path="settings" element={<SiteSettings />} />
                    </Route>
                  </Routes>
                </Suspense>
              </AnimatePresence>
            </Router>
          </NotificationsProvider>
        </ContentProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

