import { Routes, Route, useNavigationType, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import News from "./pages/News";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    // eslint-disable-next-line default-case
    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<><Home /><LoginPage /></>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/news/list" element={<News />} />
        <Route path="/news/list/:pageNum" element={<News />} />
        <Route path="/news/search/:keyword" element={<News />} />
        <Route path="/news/search/:keyword/:pageNum" element={<News />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
