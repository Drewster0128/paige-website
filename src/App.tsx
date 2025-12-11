//import { useState } from "react";
import "@css/App.css";
import { Home, Gallery, ImagePage } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router";
import { NavBar } from "./components";

function App() {
  //const [count, setCount] = useState(0);
  return (
    <div className="h-fit">
      <BrowserRouter>
        <main
          className="flex flex-col bg-neutral-950
          min-h-lvh"
        >
          <NavBar />
          <div className="flex">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    className="min-h-full
              px-4 max-w-[1264px]
              xl:mx-auto"
                  />
                }
              />
              <Route
                path="/gallery"
                element={<Gallery className="min-h-full grow px-4 max-w-[1264px] xl:mx-auto" />}
              />
              <Route path="/images/:id" element={<ImagePage />} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
