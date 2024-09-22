import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import { Layout, Home } from '../Components'
import { LoginPage, SignupPage, FreelancerDashboard, JobsPage, FreelancerDashboardDefault, NotFound, ErrorBoundary, CompanyDashboard, FreelancerProfilePage, CompanyProfilePage, CompanyDashboardDefault, PostJobPage, JobsPosted} from '../Pages'
import { ProtectedRoute } from '../Components'






export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Normal Routes with ErrorBoundary */}
            <Route path="/" element={
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

                {/* Nested Routes under CompanyDashboard */}
                <Route path="" element={<CompanyDashboardDefault />} />
                <Route path="/company-dashboard/profile" element={<CompanyProfilePage />} />
                 <Route path="/company-dashboard/post-job" element={<PostJobPage />} />
          <Route path="/company-dashboard/jobs-posted" element={<JobsPosted />} /> Default dashboard content

            </Route>




        </>
    )
);