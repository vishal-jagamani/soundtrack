// import { lazy } from 'react';
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import PageNotFound from './components/PageNotFound'
import Home from './pages/home'
const SignIn = lazy(() => import('./pages/auth/SignIn'))
const ErrorPage = lazy(() => import('./components/ErrorPage'))
const Search = lazy(() => import('./pages/search'))
const Playlist = lazy(() => import('./pages/playlist'))
const Artist = lazy(() => import('./pages/artist'))
const Album = lazy(() => import('./pages/album'))
const Feedback = lazy(() => import('./pages/feedback'))
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
        path: '/search/:searchText',
        element: <Search />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/playlist/:id',
        element: <Playlist />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/feedback',
        element: <Feedback />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/artist/:id',
        element: <Artist />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/album/:id',
        element: <Album />,
        errorElement: <ErrorPage />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },

  {
    path: '/sign-in',
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },

  // {
  //   path: '/add-connection',
  //   element: <TestConnection />,
  //   errorElement: <PageNotFound />,
  // },
])
