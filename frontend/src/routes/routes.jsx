import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import { Layout, Home } from '../Components'
import { LoginPage, SignupPage, FreelancerDashboard, JobsPage, FreelancerDashboardDefault, NotFound, ErrorBoundary, CompanyDashboard, FreelancerProfilePage, } from '../Pages'
import { ProtectedRoute } from '../Components'







export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Normal Routes with ErrorBoundary */}
            <Route element={
                <ErrorBoundary>
                    <Layout />
                </ErrorBoundary>
            } errorElement={<ErrorBoundary />}>
                <Route index element={<Home />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="/*" element={<NotFound />} />
            </Route>

            {/* Protected Routes for Freelancer */}
            <Route path="/freelancer-dashboard" element={
                <ErrorBoundary>
                    <ProtectedRoute>
                        <FreelancerDashboard />
                    </ProtectedRoute>
                </ErrorBoundary>
            } errorElement={<ErrorBoundary />}>
                {/* Nested Routes under FreelancerDashboard */}
                <Route path="/freelancer-dashboard/profile" element={<FreelancerProfilePage />} />
                <Route path="/freelancer-dashboard/jobs" element={<JobsPage />} />
                <Route path="" element={<FreelancerDashboardDefault />} /> {/* Default dashboard content */}
            </Route>

            {/* Protected Routes for Company */}
            <Route path="/company-dashboard" element={
                <ErrorBoundary>
                    <ProtectedRoute>
                        <CompanyDashboard />
                    </ProtectedRoute>
                </ErrorBoundary>
            } errorElement={<ErrorBoundary />}>

                {/* Nested Routes under FreelancerDashboard */}
                {/* <Route path="/freelancer-dashboard/profile" element={<ProfilePage />} />
          <Route path="/freelancer-dashboard/jobs" element={<JobsPage />} />
          <Route path="" element={<FreelancerDashboardDefault />} /> Default dashboard content */}

            </Route>




        </>
    )
);