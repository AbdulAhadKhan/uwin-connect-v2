import { createBrowserRouter } from "react-router-dom"

import Home from "./pages/Home"
import Landing from "./pages/landing"

export const BrowserRouter = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Landing /> },
])