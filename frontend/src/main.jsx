import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import { Layout, Home } from './Components'
import { LoginPage, SignupPage, FreelancerDashboard, JobsPage, DashboardDefault } from './Pages'
import { ProtectedRoute } from './utils'
import { Provider } from "react-redux"
import store from '../redux/store/store'
import ProfilePage from './Pages/ProfilePage/ProfilePage'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />

      </Route>

      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <FreelancerDashboard />
        </ProtectedRoute>
      }>
        {/* Nested Routes under FreelancerDashboard */}
        <Route path="/dashboard/profile" element={<ProfilePage />} />
        <Route path="/dashboard/jobs" element={<JobsPage />} />
        <Route path="" element={<DashboardDefault />} /> {/* Default dashboard content */}
      </Route>

    </>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)