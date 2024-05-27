import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ProductListing from "./pages/ProductListing";
import Cart from "./pages/Cart";
import { GlobalProvider } from "./GlobalContexts";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

function App() {
  return (
    <>
      <Router>
        <GlobalProvider>
          <Header />
          <Routes>
            <Route path="/" Component={ProductListing} />
            <Route path="/cart" Component={Cart} />
            <Route path="/signup" Component={Signup} />
            <Route path="/login" Component={Login} />
            <Route path="/success" Component={Success} />
            <Route path="/cancel" Component={Cancel} />
            <Route path="/*" element={<h1>Not Found</h1>} />
          </Routes>
        </GlobalProvider>
      </Router>
    </>
  );
}

export default App;
