import "./OfferPage.css";
import { FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { useParams } from "react-router-dom";
import { BankOffer, getOffer } from "../modules/BankOfferApi";
import { Spinner, Image } from "react-bootstrap";
import defaultImage from "../assets/default_image.png";
import { OFFER_MOCK } from "../modules/mocks";
import NavigationBar from "../components/NavBar";

const OfferPage: FC = () => {
    const [offer, setOffer] = useState<BankOffer>();

    const { id } = useParams();

    useEffect(() => {
        if (!id) return;

        getOffer(id)
            .then((response) => {
                setOffer(response)
            })
            .catch(() => {
                setOffer(OFFER_MOCK);
            });
    }, [id]);

    return (
        <div>
            <NavigationBar/>
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
