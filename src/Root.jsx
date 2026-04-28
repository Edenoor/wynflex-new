import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "./components/Navbar";
import LoadingScreen from "./views/LoadingScreen";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { ModalProvider } from "./components/Modal";
import useDevice from "./hooks/useDevice";
import DeviceContext from "./context/DeviceContext";

function Root() {
  const { device, sizes } = useDevice();

  return (
    <div>
      <Navbar />
      <div>
        <Suspense fallback={<LoadingScreen />}>
          <ScrollToTop />
          <DeviceContext.Provider value={{ device, sizes }}>
            <ModalProvider>
              <Outlet />
            </ModalProvider>
          </DeviceContext.Provider>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}

export default Root;