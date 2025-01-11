import "./OffersPage.css";
import { FC, useEffect, useState } from "react";
import { Button, Col, Row, Spinner, Card } from "react-bootstrap";
import { BankOffer, getOffers } from "../modules/BankOfferApi";
import SearchField from "../components/SearchField";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../Routes";

import { useNavigate } from "react-router-dom";
import { OFFERS_MOCK } from "../modules/mocks";
import NavigationBar from "../components/NavBar";

const OffersPage: FC = () => {
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [offers, setOffers] = useState<BankOffer[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        getOffers()
            .then((response) => {
                setOffers(response.offers);
                setLoading(false);
            })
            .catch(() => {
                setOffers(OFFERS_MOCK.offers);
                setLoading(false);
            });
    }, [])

    const handleSearch = () => {
        setLoading(true);
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
    };

    const handleCardClick = (id: number) => {
        navigate(`${ROUTES.OFFERS}/${id}`);
    };

    return (
        <>
            <NavigationBar/>
            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.OFFERS }]} />

            <div className="top-container">
                <div className="title">Услуги Банка частным лицам </div>

                <div className="horizontal-container">
                    <SearchField
                        value={searchValue}
                        setValue={(value) => setSearchValue(value)}
                        loading={loading}
                        placeholder="Поиск по названию"
                        onSubmit={handleSearch}
                    />
                </div>
            </div>

            <div className="container">
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
                                    <Card className="custom-card">
                                        <Card.Img variant="top" src={item.imageUrl} />
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
