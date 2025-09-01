import { createBrowserRouter } from "react-router-dom";
import Layout from './../components/Layout/Layout';
import Posts from './../pages/Posts/Posts';
import Login from './../pages/auth/Login/Login';
import Register from './../pages/auth/Register/Register';
import NotFound from './../pages/NotFound/NotFound';
import Profile from "../pages/auth/Profile/Profile";
import ProtectRoute from './ProtectRoute';
import ProtectAuthRoute from "./ProtectAuthRoute";
import PostDetails from "../pages/PostDetails/PostDetails";

    let router = createBrowserRouter([
        {path:"/" , element:<Layout />, children:[
          {index:true, element:<ProtectRoute><Posts /></ProtectRoute>},
          {path:"profile" , element:<ProtectRoute><Profile /></ProtectRoute>},
          {path:"post-details/:id" , element:<ProtectRoute><PostDetails /></ProtectRoute>},
          {path:"login" , element:<ProtectAuthRoute><Login /></ProtectAuthRoute>},
          {path:"register" , element:<ProtectAuthRoute><Register /></ProtectAuthRoute>},
          {path:"*" , element:<NotFound />},
        ]}
      ])

export default router