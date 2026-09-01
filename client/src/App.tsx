import type { FC } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import RootLayout from "@/layouts/RootLayout"
import { Blog } from "@/pages/Blog"
import { Education } from "@/pages/Education"
import { Events } from "@/pages/Events"
import { Experience } from "@/pages/Experience"
import { Home } from "@/pages/Home"
import { Projects } from "@/pages/Projects"
import { ProjectDetail } from "@/pages/Projects/ProjectDetail"

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
        path: "experience",
        element: <Experience />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "education",
        element: <Education />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "projects/:projectId",
        element: <ProjectDetail />,
      },
    ],
  },
])

const App: FC = () => {
  return <RouterProvider router={router} />
}

export default App
