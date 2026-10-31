import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import ShowDetailsPage from "./pages/ShowDetailsPage.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<GalleryPage />} />
          <Route path="/shows/:showId" element={<ShowDetailsPage />} />
          <Route path="*" element={<GalleryPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
