import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OfferPage from "./pages/OfferPage";
import OffersPage from "./pages/OffersPage";
import { ROUTES } from "./Routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.OFFERS} element={<OffersPage />} />
        <Route path={`${ROUTES.OFFERS}/:id`} element={<OfferPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;