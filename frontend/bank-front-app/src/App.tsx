import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OfferPage from "./pages/OfferPage";
import OffersPage from "./pages/OffersPage";
import { ROUTES } from "./Routes";
import ApplicationPage from "./pages/ApplicationPage.tsx";
import ApplicationsPage from "./pages/ApplicationsPage.tsx";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ForbiddenPage from "./pages/ForbiddenPage";
import OffersTablePage from "./pages/OffersTablePage";
import OfferEditPage from "./pages/OfferEditPage";

function App() {
  return (
    <BrowserRouter basename='/Bank-Offer-Frontend'>
      <Routes>
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        <Route path={ROUTES.FORBIDDEN} element={<ForbiddenPage />} />

        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.OFFERS} element={<OffersPage />} />
        <Route path={`${ROUTES.OFFERS}/:id`} element={<OfferPage />} />
        <Route path={ROUTES.APPLICATIONS} element={<ApplicationsPage />} />
        <Route path={`${ROUTES.APPLICATIONS}/:id`} element={<ApplicationPage />} />

        <Route path={ROUTES.OFFERSTABLE} element={<OffersTablePage />} />
        <Route path={`${ROUTES.OFFERSTABLE}/:id`} element={<OfferEditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
