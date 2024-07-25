import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Profile from "./pages/Profile";
import { Toaster } from 'react-hot-toast';
import "./style.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/authContext";
import axios from "axios";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ProtectedRoute = ({ children }) => {
  const { currentuser } = useContext(AuthContext);
  const query = useQuery();
  const postId = query.get('edit');
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const state = useLocation().state;

  useEffect(() => {
      const fetchPost = async () => {
        if(postId){
          try {
            const res = await axios.get(`/posts/${postId}`);

            if(currentuser && currentuser.username === res.data.username){ 
              setIsOwner(true);
            }
          } catch (err) {
            console.log(err);
          } finally {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      };
   
    fetchPost();
  }, [postId, currentuser]);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '61.5vh' }}><i class="fa-solid fa-spinner fa-spin-pulse fa-2xl" style={{ fontSize: '50px', color: '#333' }}></i></div>;
  }

  if (!currentuser) {
    return <Navigate to="/login" />;
  }

  if (postId && !isOwner) {
    return <Navigate to="/" />;
  }

  if (postId && !state) {
    return <Navigate to="/" />;
  }

  return children;
};

const ProfileProtectedRoute = ({ children }) => {
  const { currentuser } = useContext(AuthContext);

  if (!currentuser) {
    return <Navigate to="/" />;
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
      {
        path: "/profile",
        element: <ProfileProtectedRoute><Profile /></ProfileProtectedRoute>,
      }
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
