import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/createproduct" element={<CreateProduct />} />
    </Routes>
  );
}

export default App;
