import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'
import { store } from './redux'
import { InitialAppState, Layout } from './Components'
import { BROWSE, COMPANIES, COMPANY_REGISTER, COMPANY_UPDATE, FORGOT_PASSWORD, HOME, JOB, JOB_APPLICATIONS, JOB_CREATE, JOB_LISTING, JOB_UPDATE, JOBS, LOGIN, PROFILE, SIGNUP } from './configs'
import { Browse, Companies, CompanyRegister, CompanyUpdate, Error, ForgotPassWord, Home, Job, JobApplications, JobCreate, Jobs, JobsListing, JobUpdate, Login, NotFound, Profile, SignUp } from './Pages'
import './App.css'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={HOME} />,
    errorElement: <Error />
  },
  {
    path: '/',
    element: <Layout withNavbar />,
    errorElement: <Error />,
    children: [
      {
        path: LOGIN,
        element: <Login />
      }, {
        path: SIGNUP,
        element: <SignUp />
      }, {
        path: FORGOT_PASSWORD,
        element: <ForgotPassWord />
      }
    ]
  },
  {
    path: '/',
    element: <Layout withNavbar withFooter />,
    errorElement: <Error />,
    children: [
      {
        path: HOME,
        element: <Home />
      }, {
        path: JOBS,
        element: <Jobs />
      }, {
        path: BROWSE,
        element: <Browse />
      }, {
        path: JOB,
        element: <Job />
      }, {
        path: COMPANIES,
        element: <Companies />
      }, {
        path: COMPANY_REGISTER,
        element: <CompanyRegister />
      }, {
        path: COMPANY_UPDATE,
        element: <CompanyUpdate />
      }, {
        path: JOB_LISTING,
        element: <JobsListing />
      }, {
        path: JOB_CREATE,
        element: <JobCreate />
      }, {
        path: JOB_UPDATE,
        element: <JobUpdate />
      }, {
        path: JOB_APPLICATIONS,
        element: <JobApplications />
      }, {
        path: PROFILE,
        element: <Profile />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />,
    errorElement: <Error />
  }
])

function App() {
  return (
    <>
      <Toaster position="bottom-right" expand={false} />
      <Provider store={store}>
        <InitialAppState />
        <RouterProvider router={routes} />
      </Provider>
    </>
  )
}

export default App
