import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "../pages/MainPage";
import ErrorPage from "../pages/ErrorPage";
import Main from "../components/features/Main";
import Layout from "../pages/Layout";
import ProductPage from "../components/features/ProductPage";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <MainPage />,
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "productPage",
        element: <ProductPage />,
      },
    ],
  },
]);
function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
