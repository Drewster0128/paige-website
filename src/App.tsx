import "@css/App.css";
import {
  About,
  Contact,
  Home,
  PrivacyPolicy,
  TermsOfService,
} from "./pages";
import { useEffect } from "react";
import { EventsPage } from "./features/events";
import { GalleryPage, ImagePage } from "./features/gallery";
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  useLocation,
} from "react-router";
import { Footer, NavBar } from "./components";

function ScrollToRouteStart() {
  const { hash, pathname, search, state } = useLocation();
  const shouldPreserveScroll =
    typeof state === "object" &&
    state !== null &&
    "preserveScroll" in state &&
    state.preserveScroll === true;

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (shouldPreserveScroll) {
      return;
    }

    if (pathname === "/contact" && hash === "#inquiry-form") {
      window.requestAnimationFrame(() => {
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
      });
      return;
    }

    window.scrollTo(0, 0);
  }, [hash, pathname, search, shouldPreserveScroll]);

  return null;
}

function App() {
  return (
    <div className="h-fit">
      <BrowserRouter>
        <ScrollToRouteStart />
        <main className="flex min-h-lvh flex-col bg-[var(--cream)]">
          <NavBar />
          <div className="flex grow">
            <Routes>
              <Route
                path="/"
                element={<Home className="min-h-full" />}
              />
              <Route path="/home" element={<Navigate replace to="/" />} />
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
                  <section className="mx-auto px-4 py-16 text-center text-[var(--ink)]">
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
