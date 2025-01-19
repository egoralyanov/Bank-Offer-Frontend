import "./OfferPage.css";
import { FC, useEffect } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { useParams } from "react-router-dom";
import { Spinner, Image } from "react-bootstrap";
import defaultImage from "../assets/default_image.png";
import { NavigationBar } from "../components/NavBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/authSlice";
import { useAppDispatch, RootState } from '../redux/store';
import { fetchOffer } from "../redux/offerSlice";

const OfferPage: FC = () => {
    const { isAuthenticated, user } = useSelector((state: any) => state.auth);
    const { data } = useSelector((state: RootState) => state.offer);

    const appDispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!id) return;
        appDispatch(fetchOffer(id));
    }, [appDispatch, id]);

    const handleLogout = async () => {
        try {
            await appDispatch(logoutUser()).unwrap();
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
                is_staff={user.is_staff}
                handleLogout={handleLogout}
            />

            <BreadCrumbs
                crumbs={[
                { label: ROUTE_LABELS.OFFERS, path: ROUTES.OFFERS },
                { label: data?.name || "Услуга" },
                ]}
            />
            {data ? (
                <div className="section">
                <Image
                    className="image"
                    src={data.imageUrl || defaultImage}
                    alt="Image"
                />
                <div className="title">{data.name}</div>
                <div className="content-header">Об услуге</div>
                <div className="content">
                    <div className="content-name">Бонус:&nbsp;</div>
                    <div className="content-value">{data.bonus}</div>
                </div>
                <div className="content">
                    <div className="content-name">Факт:&nbsp;</div>
                    <div className="content-value">{data.fact}</div>
                </div>
                <div className="content">
                    <div className="content-name">Стоимость:&nbsp;</div>
                    <div className="content-value">{data.cost}&nbsp;руб/мес</div>
                </div>
                <div className="content">
                    <div className="content-name">Описание:&nbsp;</div>
                    <div className="content-value">{data.description}</div>
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
