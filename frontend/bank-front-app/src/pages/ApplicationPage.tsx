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
import { useAppDispatch } from '../redux/store';
import { api } from '../api';
import { BankApplication, DetailedBankOffer } from '../api/Api';
import defaultImage from "../assets/default_image.png";
import { FaTrash } from 'react-icons/fa';
import CommentField from "../components/CommentField";

const ApplicationPage: FC = () => {
    const { isAuthenticated, user } = useSelector((state: any) => state.auth);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [application, setApplication] = useState<BankApplication>();
    const [offers, setOffers] = useState<DetailedBankOffer[]>();
    const [psrnAndCompanyName, setPsrnAndCompanyName] = useState("");
  
    const authDispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        api.applications.applicationsRead(id)
          .then((response) => {
            const data = response.data;

            if (data.application && data.offers) {
                const applicationData = data.application as BankApplication;
                const offersData = data.offers as DetailedBankOffer[];

                setApplication(applicationData);
                setOffers(offersData);
                if (offersData.length == 0 && application?.status == 'draft') {
                    navigate(ROUTES.APPLICATIONS);
                }
                setPsrnAndCompanyName(applicationData.psrn_and_company_name || '');
            } else {
                setIsError(true);
            }

            setLoading(false);
          })
          .catch(() => {
            setIsError(true);
            setLoading(false);
          });
      }, [id]);
  
    const handleCardClick = (id: number | undefined) => {
        if (id) {
            navigate(`${ROUTES.OFFERS}/${id}`);
        }
    };

    const handleCommentSubmit = (id: number | undefined, comment: string | undefined) => {
        if (application && application.pk && id && application.status == 'draft' && comment) {
            const applicationNumberString = String(application.pk);
            const idString = String(id);

            api.applications.applicationsOfferUpdate(applicationNumberString, idString, { comment: comment })
                .catch(() => { setIsError(true) });
        } else {
            alert('Изменение этой заявки невозможно');
        }
    };

    const handleMinusClick = (id: number | undefined) => {
        console.log(application);
        console.log(application?.pk);
        console.log(id);
        console.log(application?.status);
        if (application && application.pk && id && application.status == 'draft') {
            const applicationNumberString = String(application.pk);
            const idString = String(id);

            setLoading(true);
            api.applications.applicationsOfferDelete(applicationNumberString, idString)
                .then((response) => {
                    const data = response.data;
        
                    if (data.offers) {
                        const offersData = data.offers as DetailedBankOffer[];
                        setOffers(offersData);
                    } else {
                        setIsError(true);
                    }
        
                    setLoading(false);
                })
                .catch(() => {
                    setIsError(true);
                    setLoading(false);
                });
        } else {
            alert('Изменение этой заявки невозможно');
        }
    };

    const handleFieldSubmit = () => {
        if (application && application.pk && id && application.status == 'draft') {
            const applicationNumberString = String(application.pk);

            let updatedApplication = application;
            updatedApplication.psrn_and_company_name = psrnAndCompanyName;
            api.applications.applicationsUpdate(applicationNumberString, updatedApplication);
        } else {
            alert('Изменение этой заявки невозможно');
        }
    };

    const handleDeleteButtonClick = () => {
        if (application && application.pk && id && application.status == 'draft') {
            const applicationNumberString = String(application.pk);

            api.applications.applicationsDelete(applicationNumberString);

            navigate(ROUTES.APPLICATIONS);
        } else {
            alert('Изменение этой заявки невозможно');
        }
    };

    const handleSubmitButtonClick = () => {
        if (application && application.pk && id && application.status == 'draft') {
            const applicationNumberString = String(application.pk);

            api.applications.applicationsSubmitUpdate(applicationNumberString);

            navigate(ROUTES.APPLICATIONS);
        } else {
            alert('Изменение этой заявки невозможно');
        }
    };

    const handleLogout = async () => {
        try {
          await authDispatch(logoutUser()).unwrap();
    
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
                handleLogout={handleLogout}
            />

            <div className="container">
                {loading && (
                    <div className="loadingBg">
                        <Spinner animation="border" />
                    </div>
                )}
                {!loading && !isError ? (
                    <>
                        <BreadCrumbs
                            crumbs={[
                                { label: ROUTE_LABELS.APPLICATIONS, path: ROUTES.APPLICATIONS },
                                { label: `Заявка #${id}` },
                            ]}
                        />
            
                        <div className="application-page-top-container">
                            <div className="title"></div>
            
                            <div className="application-page-horizontal-container">
                                <Button variant="primary" onClick={handleSubmitButtonClick}>Сформировать заявку</Button>
                                <Button className="right-button" variant="outline-danger" onClick={handleDeleteButtonClick}>Удалить заявку</Button>
                            </div>
                        </div>

                        <InputField
                            value={psrnAndCompanyName || ""}
                            setValue={(value) => setPsrnAndCompanyName(value)}
                            placeholder="Введите ОГРН и название компании"
                            onSubmit={handleFieldSubmit}
                        />

                        {offers?.length ? (
                            <Row className="g-4">
                                {offers.map((item, index) => (
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
            </div>
        </div>
    );
};
  
export default ApplicationPage;
