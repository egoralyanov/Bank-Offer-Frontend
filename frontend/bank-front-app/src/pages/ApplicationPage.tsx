import "./ApplicationPage.css";
import { FC, useEffect, useState } from "react";
import { Image, Button, Col, Row, Spinner } from "react-bootstrap";
import InputField from "../components/InputField";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { useNavigate, useParams } from "react-router-dom";
import { NavigationBar } from "../components/NavBar";
import { useSelector } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import { useAppDispatch, RootState } from '../redux/store';
import { fetchApplication, submitComment, removeOffer, changeFullName, deleteApplication, submitApplication } from "../redux/applicationSlice";
import { BankApplication } from '../api/Api';
import defaultImage from "../assets/default_image.png";
import { FaTrash } from 'react-icons/fa';
import CommentField from "../components/CommentField";

const ApplicationPage: FC = () => {
    const { isAuthenticated, user } = useSelector((state: any) => state.auth);
    const { data, loading, error } = useSelector((state: RootState) => state.application);
    const [psrnAndCompanyName, setPsrnAndCompanyName] = useState("");
  
    const appDispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!id) return;
        appDispatch(fetchApplication(id));
        setPsrnAndCompanyName(data.applicaiton?.psrn_and_company_name || '');
      }, [appDispatch, id]);
  
    const handleCardClick = (offerId: number | undefined) => {
        if (!offerId) return;
        navigate(`${ROUTES.OFFERS}/${offerId}`);
    };

    const handleCommentSubmit = (offerId: number | undefined, comment: string | undefined) => {
        if (!id || !offerId || !comment) return;
        appDispatch(submitComment({ applicationId: id, sectionId: String(offerId), comment: comment }));
    };

    const handleMinusClick = (offerId: number | undefined) => {
        if (!id || !offerId) return;
        appDispatch(removeOffer({ applicationId: id, sectionId: String(offerId) }));
    };

    const handleFieldSubmit = () => {
        if (!id) return;

        var updatedApplication = { ...data.applicaiton } as BankApplication;
        if (!updatedApplication) return;
        updatedApplication.psrn_and_company_name = psrnAndCompanyName;
        appDispatch(changeFullName({ applicationId: id, updatedApplication: updatedApplication }));
    };

    const handleDeleteButtonClick = () => {
        if (!id) return;
        appDispatch(deleteApplication(id));
        navigate(ROUTES.APPLICATIONS);
    };

    const handleSubmitButtonClick = () => {
        if (!id) return;
        if (!data.applicaiton?.psrn_and_company_name) {
            alert('Заполните ФИО для формирования заявки');
            return;
        }
        appDispatch(submitApplication(id));
        navigate(ROUTES.APPLICATIONS);
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

            <div className="application-page-breadcrumbs-container">
                <BreadCrumbs
                    crumbs={[
                        { label: ROUTE_LABELS.APPLICATIONS, path: ROUTES.APPLICATIONS },
                        { label: `Заявка #${id}` },
                    ]}
                />
            </div>

            <div className="container">
                {loading && (
                    <div className="loadingBg">
                        <Spinner animation="border" />
                    </div>
                )}
                {!loading && !error ? (
                    <>
                        <InputField
                            value={psrnAndCompanyName || ""}
                            setValue={(value) => setPsrnAndCompanyName(value)}
                            placeholder="Введите ОГРН и название компании"
                            onSubmit={handleFieldSubmit}
                        />

                        {data.offers.length ? (
                            <Row className="g-4">
                                {data.offers.map((item, index) => (
                                    <Col key={index} xs={12}>
                                        <div className="application-page-row-container">
                                            <div className="application-cell">
                                                <Image
                                                    className="image"
                                                    src={item.imageUrl || defaultImage}
                                                    alt="Картинка"
                                                    onClick={() => handleCardClick(item.pk)}
                                                />
                                                <div className="content">
                                                    <div className="card-title">{item.name}</div>
                                                    <div className="card-location">Обслуживание: {item.cost} руб./мес.</div>
                                                    {item.account_number && (
                                                        <div className="card-location">Номер счета: {item.account_number}</div>
                                                    )}
                                                </div>
                                                <div className="position-container">
                                                    <CommentField
                                                        value={item.comment || ""}
                                                        placeholder="Комментарий"
                                                        onSubmit={(value) => handleCommentSubmit(item.pk, value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="application-page-delete-button">
                                                <Button variant="outline-danger" onClick={() => handleMinusClick(item.pk)} size="sm">
                                                    <FaTrash/>
                                                </Button>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <div>Нет добавленных секций</div>
                        )}
                    </>
                ) : (
                    <div>Нет доступа к заявке с таким id</div>
                )}

                <div className="application-page-horizontal-container">
                    <Button variant="primary" onClick={handleSubmitButtonClick}>Сформировать заявку</Button>
                    <Button className="right-button" variant="outline-danger" onClick={handleDeleteButtonClick}>Удалить заявку</Button>
                </div>
            </div>
        </div>
    );
};
  
export default ApplicationPage;
