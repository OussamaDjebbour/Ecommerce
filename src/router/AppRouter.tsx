import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "../pages/MainPage";
import ErrorPage from "../pages/ErrorPage";
import Main from "../components/features/Main";
import Layout from "../pages/Layout";
import ProductPage from "../components/features/ProductPage";
// import CheckoutPage from "../components/features/CheckoutPage";
// import CartPage from "../components/features/CartPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import ProductInfoPage from "../pages/ProductInfoPage";

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
        // path: "/product/:slug-:id",
        // path: "product/:productId",
        path: "product/:slugId",
        element: <ProductInfoPage />,
      },
      {
        path: "productPage",
        element: <ProductPage />,
      },
      {
        path: "checkout",
        element: (
          <CheckoutPage
          // product={{ id: 1, title: "test", price: 1, image: "", quantity: 1 }}
          />
        ),
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
