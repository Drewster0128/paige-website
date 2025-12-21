//import { useState } from "react";
import "@css/App.css";
import { Home, Gallery, ImagePage } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "./components";

function App() {
  //const [count, setCount] = useState(0);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/images/:id" element={<ImagePage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
