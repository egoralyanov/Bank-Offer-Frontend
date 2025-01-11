import "./OffersPage.css";
import { FC, useEffect, useState } from "react";
import { Button, Col, Row, Spinner, Card } from "react-bootstrap";
import { BankOffer, getOffers } from "../modules/BankOfferApi";
import { SearchComponent } from "../components/SearchComponent";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { useNavigate } from "react-router-dom";
import { OFFERS_MOCK } from "../modules/mocks";
import NavigationBar from "../components/NavBar";
import defaultImage from "../assets/default_image.png"
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const OffersPage: FC = () => {
    const searchValue = useSelector((state: RootState) => state.search.searchValue);
    const [loading, setLoading] = useState(false);
    const [offers, setOffers] = useState<BankOffer[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        getOffers(searchValue)
            .then((response) => {
                setOffers(response.offers);
                setLoading(false);
            })
            .catch(() => {
                setOffers(
                    OFFERS_MOCK.offers.filter((item) =>
                        item.name
                            .toLocaleLowerCase()
                            .startsWith(searchValue.toLocaleLowerCase())
                    )
                );
                setLoading(false);
            });
    }, [searchValue])

    const handleCardClick = (id: number) => {
        navigate(`${ROUTES.OFFERS}/${id}`);
    };

    return (
        <>
            <NavigationBar/>
            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.OFFERS }]} />

            <div className="offers-page-top-container">
                <div className="offers-page-top-container-title">Услуги Банка частным лицам </div>

                <div className="offers-page-horizontal-container">
                    <SearchComponent/>
                </div>
            </div>

            <div>
                {loading && (
                    <div className="loadingBg">
                        <Spinner animation="border" />
                    </div>
                )}
                {!loading &&
                    (!offers.length ? (
                        <div>
                            <h1>Такой услуги не существует</h1>
                        </div>
                    ) : (
                        <Row className="g-4">
                            {offers.map((item, index) => (
                                <Col xs={12} sm={6} md={4} lg={3} key={index}>
                                    <Card className="offers-page-card">
                                        <Card.Img variant="top" src={item.imageUrl || defaultImage}/>
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>{item.cost}&nbsp;руб/мес</Card.Text>
                                            <Card.Text>{item.fact}</Card.Text>
                                            <Button variant="primary" onClick={() => handleCardClick(item.pk)}>Подробнее</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )
                    )
                }
            </div>
        </>
    );
};

export default OffersPage;
