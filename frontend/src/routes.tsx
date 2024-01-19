// import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import SignIn from './pages/auth/SignIn'
import PageNotFound from './components/PageNotFound'
// import ErrorPage from "./components/errorPage";
// import PageNotFound from './components/utils/hoc/pageNotFound';
// const TokenValidation = lazy(() => import('./components/utils/hoc/tokenValidation'));
// const Home = lazy(() => import('./components/home/home'));
// const AssetDetail = lazy(() => import('./components/assetDetail/assetDetail'));
// const Admin = lazy(() => import('./components/admin/admin'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <PageNotFound />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
    // errorElement: <PageNotFound />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
  // {
  //   path: '/add-connection',
  //   element: <TestConnection />,
  //   errorElement: <PageNotFound />,
  // },
])
