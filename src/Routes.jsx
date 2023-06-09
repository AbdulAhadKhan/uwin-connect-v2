import { createBrowserRouter, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Landing from './pages/landing'
import Login from './pages/components/forms/login'
import Signup from './pages/components/forms/signup'
import NotFound from './pages/404'
import Profile from './pages/Profile'
import Chat from './pages/Chat'
import Search from './pages/Search'

export const BrowserRouter = createBrowserRouter([
    { path: '/404', element: <NotFound /> },
    { path: '*', element: <Navigate to='/404' /> },
    {
        path: '/',
        element: <Landing />,
        children: [
            { path: '/', element: <Login /> },
            { path: '/signup', element: <Signup /> },
        ],
    },
    { path: '/home', element: <Home /> },
    { path: '/profile/:id', element: <Profile /> },
    { path: '/chat', element: <Chat /> },
    { path: '/search', element: <Search /> },
])
