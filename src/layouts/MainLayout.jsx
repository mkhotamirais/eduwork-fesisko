import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-6rem)] px-3 pb-12 lg:px-16 bg-gradient-to-br from-red-50 via-green-100 to-blue-50">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
};

export default MainLayout;
