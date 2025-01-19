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

function App() {
  return (
    <BrowserRouter basename='/Bank-Offer-Frontend'>
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.OFFERS} element={<OffersPage />} />
        <Route path={`${ROUTES.OFFERS}/:id`} element={<OfferPage />} />
        <Route path={ROUTES.APPLICATIONS} element={<ApplicationsPage />} />
        <Route path={`${ROUTES.APPLICATIONS}/:id`} element={<ApplicationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;