// import { Routes, Route } from 'react-router-dom';
// import OhouseByHtmltodesignF from './testcomponents/OhouseByHtmltodesignF';
// // import Home from './pages/Home';
// // import LoginPage from './pages/LoginPage';
// // import RegisterPage from './pages/RegisterPage';
// // import TestPage from './TestPage';

// const App = () => {
//   return (

//     <Routes>
//       <Route path = '/' element={<OhouseByHtmltodesignF />} />
//     </Routes>

//     // <Routes>
//     //   <Route path="/" element={<Home />} />
//     //   <Route path="/login" element={<LoginPage />} />
//     //   <Route path="/register" element={<RegisterPage />} />
//     // </Routes>

//     // <Routes>
//     //   <Route path="/" element={<Home />} />
//     //   <Route path="/login" element={<TestPage />} />
//     //   <Route path="/register" element={<RegisterPage />} />
//     // </Routes>

//   );
// };

// export default App;

import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import OhouseByHtmltodesignF from "./testcomponents/OhouseByHtmltodesignF";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect } from "react";

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
    <Routes>
      <Route path="/" element={<OhouseByHtmltodesignF />} />
      <Route path="/login" element={<><OhouseByHtmltodesignF /><LoginPage /></>} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
export default App;
