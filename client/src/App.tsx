import type { FC } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import RootLayout from "@/layouts/RootLayout"
import {
  About,
  Blog,
  Education,
  Events,
  Experience,
  Home,
  Projects,
} from "@/pages"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/experience",
        element: <Experience />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/education",
        element: <Education />,
      },
      {
        path: "/events",
        element: <Events />,
      },
    ],
  },
])

const App: FC = () => {
  return <RouterProvider router={router} />
}

export default App
