import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OfferPage from "./pages/OfferPage";
import OffersPage from "./pages/OffersPage";
import { ROUTES } from "./Routes";
import { invoke } from "@tauri-apps/api/core";
import { useEffect } from "react";

function App() {
    useEffect(()=>{
        invoke('tauri', {cmd:'create'})
          .then(() =>{console.log("Tauri launched")})
          .catch(() =>{console.log("Tauri not launched")})
        return () =>{
          invoke('tauri', {cmd:'close'})
            .then(() =>{console.log("Tauri launched")})
            .catch(() =>{console.log("Tauri not launched")})
        }
    }, [])

    return (
        <BrowserRouter basename='/Bank-Offer-Frontend'>
        <Routes>
            <Route path={ROUTES.HOME} index element={<HomePage />} />
            <Route path={ROUTES.OFFERS} element={<OffersPage />} />
            <Route path={`${ROUTES.OFFERS}/:id`} element={<OfferPage />} />
        </Routes>
        </BrowserRouter>
    );
}

export default App;
