import { useEffect, useState } from "react";
// import { MobileHeader } from "./components/MobileHeader";
// import { Sidebar } from "./components/Sidebar";
// import { Header } from "./components/Header";
// import { MainContent } from "./components/MainContent";
// import { MobileContent } from "./components/MobileContent";
// import { BottomNav } from "./components/BottomNav";
import "./index.css";
// import { MENU_ITEMS } from "./constants";
import Header from "./components/features/Header";
import Sidebar from "./components/features/Sidebar";
import Main from "./components/features/Main";
import HeadphonesAd from "./components/ui/HeadphonesAd ";
import DailyDeals from "./components/ui/DailyDeals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SwiperSlider from "./components/ui/SwiperSlider";
import { SearchProvider, useSearchContext } from "./context/useSearchContext";
import ProductPage from "./components/features/ProductPage";
import { useSearchStore } from "./context/useSearchStore";
import { useSearchProducts } from "./hooks/useSearchProducts";

// Create a new QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 300000,
    },
  },
});

// Define the API URL
const API_URL = "https://fakestoreapi.com/products";
// const API_URL = "https://fakestoreapi.com/products/category/men's clothing";

type Rating = {
  rate: number;
  count: number;
};

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating[];
}

// const FetchDataWithAxios: React.FC = () => {
//   const [data, setData] = useState<Product[] | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get<Product[]>(API_URL, {
//         timeout: 5000, // Set a timeout of 5 seconds
//       });

//       // Simulate delay (optional for testing loading states)
//       // await new Promise((resolve) => setTimeout(resolve, 1000));

//       setData(response.data);
//       console.log("Data successfully fetched:", response.data);
//     } catch (err) {
//       const error = err as AxiosError;

//       if (error.response) {
//         // Server responded with a status code other than 2xx
//         setError(
//           `Server error: ${error.response.status} - ${error.response.statusText}`,
//         );
//         console.error("Response error:", error.response);
//       } else if (error.request) {
//         // Request was made but no response was received
//         setError(
//           "No response received from the server. Please try again later.",
//         );
//         console.error("Request error:", error.request);
//       } else if (error.code === "ECONNABORTED") {
//         // Timeout error
//         setError("Request timeout. The server took too long to respond.");
//         console.error("Timeout error:", error.message);
//       } else {
//         // Any other errors (e.g., network issues)
//         setError(
//           "An unexpected error occurred. Please check your internet connection.",
//         );
//         console.error("Unknown error:", error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="mb-4 text-2xl font-bold">Data Fetching with Axios</h1>

//       {loading && <p>Loading data...</p>}

//       {error && <p className="text-red-600">{error}</p>}

//       {data && (
//         <ul className="list-disc pl-5">
//           {data.map(
//             (post) =>
//               (post.category === "men's clothing" ||
//                 post.category === "electronics") && (
//                 <li key={post.id} className="mb-2">
//                   <strong>{post.title}</strong>: {post.description}
//                   <img src={post.image} alt={post.title} />
//                 </li>
//               ),
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// import { useQuery } from "@tanstack/react-query";

// Axios Fetch Function
// const fetchPosts = async (): Promise<Product[]> => {
//   const response = await axios.get<Product[]>(API_URL, {
//     timeout: 5000, // Timeout of 5 seconds
//   });
//   return response.data;
// };

// const FetchDataWithUseQuery: React.FC = () => {
//   const { data, error, isLoading, isError } = useQuery<Product[], Error>({
//     queryKey: ["posts"], // Unique key for this query
//     queryFn: fetchPosts, // Axios fetch function
//     retry: 3, // Retry failed requests up to 3 times
//     staleTime: 1000 * 60 * 5, // Cache the data for 5 minutes
//     onError: (err: Error) => {
//       console.error("Error fetching data:", err.message);
//     },
//   });

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Data Fetching with useQuery</h1>

//       {isLoading && <p>Loading data...</p>}

//       {isError && <p className="text-red-600">Error: {error?.message}</p>}

//       {data && (
//         <ul className="list-disc pl-5">
//           {data.map((post: Product) => (
//             <li key={post.id} className="mb-2">
//               <strong>{post.title}</strong>: {post.description}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

const fetchData = async () => {
  // fetch("https://fakestoreapi.com/products")
  fetch("https://api.escuelajs.co/api/v1/products/?categoryId=2")
    .then((res) => res.json())
    .then((json) => json);
};

function App() {
  // const [products, setProducts] = useState([]);

  // const [searchQuery, setSearchQuery] = useState("");

  // const { searchQuery } = useSearchContext();
  // const { products, isLoading } = useSearchProducts();

  // console.log("searchQuery", searchQuery);
  // console.log("suggestions", suggestions);

  const { isSearching } = useSearchStore();

  useEffect(() => {
    // console.log(`Count: ${count}`);
    // if (count) setCount(1);
    // fetchData();
    // fetch("https://fakestoreapi.com/products?limit=100")
    // fetch("https://dummyjson.com/products/category/tablets")
    // fetch("https://dummyjson.com/products?limit=100&sortBy=rating&order=desc")
    //   .then((res) => res.json())
    //   .then((data) => setProducts(data.products));
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then(console.log);
  }, []);

  // console.log("productss", products);

  return (
    // <FetchDataWithUseQuery />
    // <FetchDataWithAxios />
    // <div className="min-h-screen bg-white">
    //   {/* Mobile Layout */}
    //   <div className="lg:hidden">
    //     <MobileHeader />
    //     <MobileContent />
    //     <BottomNav />
    //   </div>

    //   {/* Desktop Layout */}
    //   <div className="hidden lg:block">
    //     <Sidebar />
    //     <Header />
    //     <MainContent />
    //   </div>
    // </div>
    // <QueryClientProvider client={queryClient}>
    //   <SearchProvider>
    <>
      <div className="mx-auto grid min-h-screen max-w-screen-2xl grid-cols-[auto_1fr_22.875rem] grid-rows-[auto_1fr] gap-y-6 overflow-hidden bg-[#FAFAFA] pr-6 font-bold">
        {/* <div className="grid min-h-screen grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr] gap-x-12 gap-y-6 bg-[#FAFAFA] font-bold"> */}
        <Header />
        <Sidebar />
        {/* <SwiperSlider /> */}
        {/* <Main /> */}
        {/* {products?.length > 0 ? <ProductPage /> : <Main />} */}
        {!isSearching ? <Main /> : <ProductPage />}
        {/* {products?.length > 0 && <ProductPage />} */}
        {/* <ProductPage /> */}
        {!isSearching && (
          <div className="col-span-1 row-span-1">
            <HeadphonesAd />

            <DailyDeals />
          </div>
        )}
        {/* <PopularCategories /> */}
        {/* <SummerPromo /> */}
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
    //  </SearchProvider>
    // </QueryClientProvider>
    // <div>
    //   <h1>Products</h1>
    //   <ul>
    //     {products.map((product) => (
    //       <li key={product.id}>
    //         <h2>{product.title}</h2>
    //         <p>Price: ${product.price}</p>
    //         <img src={product.images[0]} alt={product.title} width="150" />
    //       </li>
    //     ))}
    //     {/* {products.map((product) => (
    //       <li key={product.id}>
    //         <h2>{product.title}</h2>
    //         <p>Price: ${product.price}</p>
    //         <img src={product.images[0]} alt={product.title} width="150" />
    //       </li>
    //     ))} */}
    //   </ul>
    // </div>
  );
}

export default App;
