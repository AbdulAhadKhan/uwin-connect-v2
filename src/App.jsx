import { RouterProvider } from "react-router-dom"
import { BrowserRouter } from "./Routes"

export default function App() {
  return <RouterProvider router={BrowserRouter} />
}
