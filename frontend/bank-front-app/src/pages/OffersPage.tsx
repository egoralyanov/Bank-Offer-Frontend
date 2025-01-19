import "./OffersPage.css";
import { FC, useEffect, useState } from "react";
import { Button, Col, Row, Spinner, Card, Badge } from "react-bootstrap";
import { SearchComponent } from "../components/SearchComponent";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { useNavigate } from "react-router-dom";
import { OFFERS_MOCK } from "../modules/mocks";
import { NavigationBar } from "../components/NavBar";
import defaultImage from "../assets/default_image.png"
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logoutUser } from "../redux/authSlice";
import { useAppDispatch } from '../redux/store';
import { api } from '../api';
import { BankOffer } from '../api/Api';

const OffersPage: FC = () => {
    const { isAuthenticated, user } = useSelector((state: any) => state.auth);
    const searchValue = useSelector((state: RootState) => state.search.searchValue);
    const [loading, setLoading] = useState(false);
    const [offers, setOffers] = useState<BankOffer[]>([]);
    const [applicationSectionsCounter, setApplicationSectionsCounter] = useState(0);
    const [draftApplicationID, setDraftApplicationID] = useState(0);

    const authDispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        api.offers.offersList({ offer_name: searchValue })
            .then((response) => {
                const data = response.data;

                if (data && data.offers) {
                    const offersData = data.offers as BankOffer[];
    
                    setOffers(offersData);
                }
    
                if (data && data.draft_application_id && data.application_offers_counter) {
                    const numberOfSectionsData = data.application_offers_counter as number;
                    const draftApplicationIDData = data.draft_application_id as number;
    
                    setApplicationSectionsCounter(numberOfSectionsData);
                    setDraftApplicationID(draftApplicationIDData);
                }

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

    const handleCardClick = (id: number | undefined) => {
        if (id) {
            navigate(`${ROUTES.OFFERS}/${id}`);
        }
    };

    const handleApplicationButtonClick = () => {
        navigate(`${ROUTES.APPLICATIONS}/${draftApplicationID}`);
    };
    
    const handleAddSection = (sectionId: number | undefined) => {
        if (sectionId) {
            api.applications.applicationsCreate({section_id: sectionId})
                .then((response) => {
                    const data = response.data;

                    if (data && data.draft_application_id) {
                        const draftApplicationIDData = data.draft_application_id as number;

                        setApplicationSectionsCounter(applicationSectionsCounter + 1);
                        setDraftApplicationID(draftApplicationIDData);
                    }
                })
        }
    }

    const handleLogout = async () => {
        try {
            await authDispatch(logoutUser()).unwrap();

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
                handleLogout={handleLogout}
            />

            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.OFFERS }]} />

            <div className="offers-page-top-container">
                <div className="offers-page-top-container-title">Услуги Банка частным лицам </div>

                <div className="offers-page-horizontal-container">
                    <SearchComponent/>

                    <>
                        {applicationSectionsCounter > 0 ? (
                            <Button variant="outline-primary" onClick={handleApplicationButtonClick}>
                                Заявка <Badge bg="primary">{applicationSectionsCounter}</Badge>
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
