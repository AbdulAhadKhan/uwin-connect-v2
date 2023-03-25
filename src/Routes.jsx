import { createBrowserRouter } from "react-router-dom"

import Home from "./pages/Home"
import Landing from "./pages/landing"
import Login from "./pages/components/forms/login"
import Signup from "./pages/components/forms/signup"
import NotFound from "./pages/404"
import Profile from "./pages/Profile"
import Chat from "./pages/Chat"

export const BrowserRouter = createBrowserRouter([
    { path: "*", element: <NotFound /> },
    { path: "/", element: <Landing />, children: [
        { path: "/", element: <Login /> },
        { path: "/signup", element: <Signup /> },
    ] },
    { path: "/home", element: <Home /> },
    { path: "/profile", element: <Profile /> },
    { path: "/chat", element: <Chat /> },
])