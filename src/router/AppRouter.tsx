import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Main from "../components/features/Main";
import Layout from "../pages/Layout";
import ProductPage from "../components/features/ProductPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import ProductInfoPage from "../pages/ProductInfoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "product/:slugId",
        element: <ProductInfoPage />,
      },
      {
        path: "productPage",
        element: <ProductPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },
]);
function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
