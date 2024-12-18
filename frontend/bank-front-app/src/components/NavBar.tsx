import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ROUTES, ROUTE_LABELS } from "../Routes";

function NavigationBar() {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
        <Navbar.Brand href={ROUTES.HOME}>{ROUTE_LABELS.HOME}</Navbar.Brand>

        <Nav>
            <Nav.Item>
                <Nav.Link href={ROUTES.OFFERS}>{ROUTE_LABELS.OFFERS}</Nav.Link>
            </Nav.Item>
        </Nav>
    </Navbar>
  );
}

export default NavigationBar;
