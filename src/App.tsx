import "@css/App.css";
import {
  About,
  Contact,
  Home,
  PrivacyPolicy,
  TermsOfService,
} from "./pages";
import { EventsPage } from "./features/events";
import { GalleryPage, ImagePage } from "./features/gallery";
import { BrowserRouter, Navigate, Routes, Route } from "react-router";
import { Footer, NavBar } from "./components";

function App() {
  return (
    <div className="h-fit">
      <BrowserRouter>
        <main className="flex min-h-lvh flex-col bg-[var(--ink)]">
          <NavBar />
          <div className="flex grow">
            <Routes>
              <Route
                path="/"
                element={<Navigate replace to="/home" />}
              />
              <Route
                path="/home"
                element={<Home className="min-h-full" />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route
                path="/gallery"
                element={
                  <GalleryPage className="min-h-full w-full grow" />
                }
              />
              <Route path="/images/:identifier" element={<ImagePage />} />
              <Route
                path="*"
                element={
                  <section className="mx-auto px-4 py-16 text-center text-[var(--cream)]">
                    <h1 className="text-4xl">Page not found</h1>
                  </section>
                }
              />
            </Routes>
          </div>
          <Footer />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
