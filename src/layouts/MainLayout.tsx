import Footer from "@/components/footers/Footer";
import { Outlet } from "react-router-dom";

const MainLayout : React.FC = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;