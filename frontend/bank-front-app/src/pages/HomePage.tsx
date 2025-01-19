import { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ImageCarousel from "../components/ImageCarousel";
import { NavigationBar } from "../components/NavBar";
import { useSelector } from "react-redux";
import { useAppDispatch } from '../redux/store';
import { logoutUser } from "../redux/authSlice";

const HomePage: FC = () => {
    const { isAuthenticated, user } = useSelector((state: any) => state.auth);

    const authDispatch = useAppDispatch();

    const handleLogout = async () => {
        try {
          await authDispatch(logoutUser()).unwrap();
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

            <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center">
                <Row className="text-center" style={{ maxWidth: "600px", width: "100%" }}>
                    <Col>
                        <h1>Банковские услуги</h1>
                        <p>
                            Здесь вы можете воспользоваться банковскими услугами.
                        </p>
                        <ImageCarousel/>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default HomePage;
