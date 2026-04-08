import { Outlet } from "react-router"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
      <Navbar />
      <div className=" top-16.75 relative mx-auto">
        <Outlet />
        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App
