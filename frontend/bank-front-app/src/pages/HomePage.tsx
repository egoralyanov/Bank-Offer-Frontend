import { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ImageCarousel from "../components/ImageCarousel";
import NavigationBar from "../components/NavBar";

const HomePage: FC = () => {
    return (
        <>
            <NavigationBar/>
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
