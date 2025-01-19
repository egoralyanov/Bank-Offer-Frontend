import "./OfferPage.css";
import { FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { useParams } from "react-router-dom";
import { Spinner, Image } from "react-bootstrap";
import defaultImage from "../assets/default_image.png";
import { OFFER_MOCK } from "../modules/mocks";
import { NavigationBar } from "../components/NavBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/authSlice";
import { useAppDispatch } from '../redux/store';
import { api } from '../api';
import { BankOffer } from '../api/Api';

const OfferPage: FC = () => {
    const { isAuthenticated, user } = useSelector((state: any) => state.auth);
    const [offer, setOffer] = useState<BankOffer>();

    const authDispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!id) return;

        api.offers.offersRead(id)
            .then((response) => { setOffer(response.data) })
            .catch(() => { setOffer(OFFER_MOCK) });
    }, [id]);

    const handleLogout = async () => {
        try {
            await authDispatch(logoutUser()).unwrap();

            navigate(ROUTES.HOME);
        } catch (error) {
            console.error('Ошибка деавторизации:', error);
        }
    };

    return (
        <div>
            <NavigationBar
                isAuthenticated={isAuthenticated}
                username={user.username}
                handleLogout={handleLogout}
            />

            <BreadCrumbs
                crumbs={[
                { label: ROUTE_LABELS.OFFERS, path: ROUTES.OFFERS },
                { label: offer?.name || "Услуга" },
                ]}
            />
            {offer ? (
                <div className="section">
                <Image
                    className="image"
                    src={offer.imageUrl || defaultImage}
                    alt="Image"
                />
                <div className="title">{offer.name}</div>
                <div className="content-header">Об услуге</div>
                <div className="content">
                    <div className="content-name">Бонус:&nbsp;</div>
                    <div className="content-value">{offer.bonus}</div>
                </div>
                <div className="content">
                    <div className="content-name">Факт:&nbsp;</div>
                    <div className="content-value">{offer.fact}</div>
                </div>
                <div className="content">
                    <div className="content-name">Стоимость:&nbsp;</div>
                    <div className="content-value">{offer.cost}&nbsp;руб/мес</div>
                </div>
                <div className="content">
                    <div className="content-name">Описание:&nbsp;</div>
                    <div className="content-value">{offer.description}</div>
                </div>
                </div>
            ) : (
                <div className="album_page_loader_block">
                <Spinner animation="border" />
                </div>
            )}
        </div>
    );
};

export default OfferPage;
