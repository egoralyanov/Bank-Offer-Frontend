import "./OffersTablePage.css";
import { FC, useEffect } from "react";
import { Col, Row, Spinner, Container, Button } from "react-bootstrap";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "../components/NavBar";
import { useSelector } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import { useAppDispatch, RootState } from '../redux/store';
import { fetchOffers, deleteOffer } from "../redux/offersSlice";
import { FaTrash } from 'react-icons/fa';

const OffersTablePage: FC = () => {
    const { isAuthenticated, user } = useSelector((state: any) => state.auth);
    const { data, loading } = useSelector((state: RootState) => state.offers);

    const appDispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        appDispatch(fetchOffers());
    }, [appDispatch])

    useEffect(() => {
        if (!user.is_staff) {
            navigate(ROUTES.FORBIDDEN);
            return;
        }

        appDispatch(fetchOffers());
    }, [user]);

    const handleCardClick = (id: number | undefined) => {
        if (id) navigate(`${ROUTES.OFFERSTABLE}/${id}`);
    };

    const handleDelete = (id: number | undefined) => {
        if (!id) return;

        appDispatch(deleteOffer(String(id)));
    };

    const handleAddButtonClick = () => {
        navigate(`${ROUTES.OFFERSTABLE}/0`);
    };

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
            <div className="offers-table-page-container">
                <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.OFFERS }]} />

                <div className="top-container">
                    <div className="title">На этой неделе</div>
                </div>

                {loading && (
                    <div className="loadingBg">
                        <Spinner animation="border" />
                    </div>
                )}
                {!loading &&
                    (!data.offers.length ? (
                        <div>
                            <h1>Такого курса на этой неделе не будет</h1>
                        </div>
                    ) : (
                        <div className="table-container">
                            <div className="offers-table-page-horizontal-container">
                                <Button variant="danger" onClick={handleAddButtonClick}>Добавить секцию</Button>
                            </div>

                            <Container fluid>
                                <Row>
                                    <Col>#</Col>
                                    <Col>Изображение</Col>
                                    <Col>Название</Col>
                                    <Col>Стоимость обсуживания</Col>
                                    <Col>Удалить</Col>
                                </Row>

                                {data.offers.map((item, _) => (
                                    <Row key={item.pk} className="my-2 offers-table-page-row align-items-center">
                                        <Col onClick={() => handleCardClick(item.pk)} style={{ cursor: "pointer", textDecoration: 'underline', color: 'blue' }}>{item.pk}</Col>
                                        <Col>
                                            {item.imageUrl ? (
                                                <img src={item.imageUrl} alt="offer" style={{ maxWidth: "100px", maxHeight: "50px" }} />
                                            ) : (
                                                '--'
                                            )}
                                        </Col>
                                        <Col>{item.name}</Col>
                                        <Col>{item.cost || '--'} руб./мес.</Col>
                                        <Col>
                                            <FaTrash
                                                style={{ color: 'red' }}
                                                onClick={() => { handleDelete(item.pk); }}
                                            />
                                        </Col>
                                    </Row>
                                ))}
                            </Container>
                        </div>
                    )
                    )
                }
            </div>
        </div>
    );
};

export default OffersTablePage;
