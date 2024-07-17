import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Single from "./pages/Single";
import Write from "./pages/Write";
import { Toaster } from 'react-hot-toast';
import "./style.scss";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

const ProtectedRoute = ({ children }) => {
  const { currentuser } = useContext(AuthContext);

  if (!currentuser) {
    return <Navigate to="/login" />;
  }

  return children;
};

const Layout = () => {
  return (
    <div className="container">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <ProtectedRoute><Write /></ProtectedRoute>,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  }

])


function App() {
  return (
    <div className="App">
    <RouterProvider router={router} />
    <Toaster position="bottom-left" reverseOrder={false}  toastOptions={{
          style: {
            width: '400px',
            height: '50px',
            border: '1px solid lightgrey',
            borderRadius: '0',
            zIndex: 999,
            padding: '16px',
            color: 'black',
          }
    }}/>
    </div>
  );
}

export default App;
