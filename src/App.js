import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./pages/Login";
import Main from "./pages/Main";
import "./assets/style/styles.css";
import CreateAccount from "./pages/CreateAccount";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateAccount />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
