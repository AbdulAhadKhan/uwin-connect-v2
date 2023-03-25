import { RouterProvider } from "react-router-dom"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { BrowserRouter } from "./Routes"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const queryClient = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={queryClient} >
            <RouterProvider router={BrowserRouter} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
