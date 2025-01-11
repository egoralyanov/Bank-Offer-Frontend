import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
        <Navbar.Brand as={Link} to={ROUTES.HOME}>{ROUTE_LABELS.HOME}</Navbar.Brand>

        <Nav>
            <Nav.Item>
                <Nav.Link as={Link} to={ROUTES.OFFERS}>{ROUTE_LABELS.OFFERS}</Nav.Link>
            </Nav.Item>
        </Nav>
    </Navbar>
  );
}

export default NavigationBar;
