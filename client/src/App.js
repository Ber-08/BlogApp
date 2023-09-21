import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Single from "./Pages/Single";
import Write from "./Pages/Write";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import "./CSS/index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="container">
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/post/:id" element={<Single />} />
              <Route path="/write" element={<Write />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={1000} />
    </BrowserRouter>
  );
}

export default App;
