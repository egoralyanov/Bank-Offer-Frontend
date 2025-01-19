import "./OffersPage.css";
import { FC, useEffect } from "react";
import { Button, Col, Row, Spinner, Card, Badge } from "react-bootstrap";
import { SearchComponent } from "../components/SearchComponent";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "../components/NavBar";
import defaultImage from "../assets/default_image.png"
import { useSelector } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import { useAppDispatch, RootState } from '../redux/store';
import { fetchOffers, addOfferToDraft } from "../redux/offersSlice";

const OffersPage: FC = () => {
    const { isAuthenticated, user } = useSelector((state: any) => state.auth);
    const { data, loading } = useSelector((state: RootState) => state.offers);
    const searchValue = useSelector((state: RootState) => state.search.searchValue);

    const appDispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        appDispatch(fetchOffers(searchValue));
    }, [appDispatch, searchValue])

    const handleCardClick = (id: number | undefined) => {
        if (id) navigate(`${ROUTES.OFFERS}/${id}`)
    };

    const handleApplicationButtonClick = () => {
        navigate(`${ROUTES.APPLICATIONS}/${data.draftApplicationID}`);
    };
    
    const handleAddSection = (sectionId: number | undefined) => {
        if (sectionId) appDispatch(addOfferToDraft(sectionId))
    }

    const handleLogout = async () => {
        try {
            await appDispatch(logoutUser()).unwrap();
            navigate(ROUTES.HOME);
        } catch (error) {
            console.error('Ошибка деавторизации:', error);
        }
    };

    return (
        <>
            <NavigationBar
                isAuthenticated={isAuthenticated}
                username={user.username}
                is_staff={user.is_staff}
                handleLogout={handleLogout}
            />

            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.OFFERS }]} />

            <div className="offers-page-top-container">
                <div className="offers-page-top-container-title">Услуги Банка частным лицам </div>

                <div className="offers-page-horizontal-container">
                    <SearchComponent/>

                    <>
                        {data.applicationSectionsCounter > 0 ? (
                            <Button variant="outline-primary" onClick={handleApplicationButtonClick}>
                                Заявка <Badge bg="primary">{data.applicationSectionsCounter}</Badge>
                            </Button>
                        ) : (
                            <Button variant="secondary">Заявка</Button> 
                        )}
                    </>
                </div>
            </div>

            <div>
                {loading && (
                    <div className="loadingBg">
                        <Spinner animation="border" />
                    </div>
                )}
                {!loading &&
                    (!data.offers.length ? (
                        <div>
                            <h1>Такой услуги не существует</h1>
                        </div>
                    ) : (
                        <Row className="g-4">
                            {data.offers.map((item, index) => (
                                <Col xs={12} sm={6} md={4} lg={3} key={index}>
                                    <Card className="offers-page-card">
                                        <Card.Img variant="top" src={item.imageUrl || defaultImage}/>
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>{item.cost}&nbsp;руб/мес</Card.Text>
                                            <Card.Text>{item.fact}</Card.Text>
                                            <Button variant="primary" onClick={() => handleCardClick(item.pk)}>Подробнее</Button>
                                            <> </>
                                            <Button variant="outline-primary" onClick={() => handleAddSection(item.pk)}>Добавить</Button>
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
