// import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import SignIn from './pages/auth/SignIn'
import PageNotFound from './components/PageNotFound'
import Layout from './components/Layout'
import Search from './pages/search'
import Playlist from './pages/playlist'
import ErrorPage from './components/ErrorPage'
import Feedback from './pages/feedback'
import Artist from './pages/artist'
// import ErrorPage from "./components/errorPage";
// import PageNotFound from './components/utils/hoc/pageNotFound';
// const TokenValidation = lazy(() => import('./components/utils/hoc/tokenValidation'));
// const Home = lazy(() => import('./components/home/home'));
// const AssetDetail = lazy(() => import('./components/assetDetail/assetDetail'));
// const Admin = lazy(() => import('./components/admin/admin'));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/search',
        element: <Search />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/playlist',
        element: <Playlist />,
        errorElement: <ErrorPage />,
      },
      // {
      //   path: '/feedback',
      //   element: <Feedback />,
      //   errorElement: <ErrorPage />,
      // },
      {
        path: '/artist/:id',
        element: <Artist />,
        errorElement: <ErrorPage />,
      },
    ],
  },

  {
    path: '/sign-in',
    element: <SignIn />,
    errorElement: <ErrorPage />,
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
