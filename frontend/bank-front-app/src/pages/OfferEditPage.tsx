import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Container, Alert, Row, Col, Image } from 'react-bootstrap';
import { BankOffer } from '../api/Api';
import { ROUTES } from '../Routes';
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from '../redux/store';
import { fetchOffer, updateOffer, updateOfferImage, createOffer } from "../redux/offerSlice";

const OfferEditPage = () => {
    const { data, loading, error } = useSelector((state: RootState) => state.offer);

    const [formData, setFormData] = useState<BankOffer | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const appDispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!id || id == '0') return;
        appDispatch(fetchOffer(id));
    }, [appDispatch, id]);

    useEffect(() => {
        if (!data || id == '0') return;
        setFormData(data);
        setImagePreview(data.imageUrl || null);
    }, [data]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData!,
            [name]: value
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };

            reader.readAsDataURL(file);
            setImageFile(file);
        }
    };

    const handleSubmit = async () => {
        if (id == '0' && formData) {
            if (!formData.name || !formData.description || !formData.cost || !formData.fact || !formData.bonus) {
                alert('Заполните все поля');
                return;
            }
            appDispatch(createOffer(formData));
            navigate(ROUTES.OFFERSTABLE);
            return;
        } else {
            alert('Заполните все поля');
        }

        if (!id || !formData || !data) return;

        appDispatch(updateOffer({ sectionId: id, updatedSection: formData }));
        navigate(ROUTES.OFFERS);
    };

    const handleImageUpdate = async () => {
        if (!id || !imageFile) return;

        appDispatch(updateOfferImage({ sectionId: id, imageFile: imageFile }));
        navigate(ROUTES.OFFERSTABLE);
    };  


    if (loading && id != '0') {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <Alert variant="danger">Ошибка!</Alert>;
    }

    if (!data && id != '0') {
        return <div>Элемент не найден.</div>;
    }

    return (
        <Container className="mt-4">
            <h2>Редактировать услугу</h2>
            <Form className="mt-3">
                <Row>
                <Col md={6}>
                    <Form.Group controlId="title">
                    <Form.Label>Название</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={formData?.name || ''}
                        onChange={handleInputChange}
                        placeholder="Введите название"
                    />
                    </Form.Group>
                </Col>
                </Row>

                <Row className="mt-3">
                <Col md={6}>
                    <Form.Group controlId="location">
                    <Form.Label>Факт</Form.Label>
                    <Form.Control
                        type="text"
                        name="location"
                        value={formData?.fact || ''}
                        onChange={handleInputChange}
                        placeholder="Введите факт"
                    />
                    </Form.Group>
                </Col>
                </Row>

                <Row className="mt-3">
                <Col md={6}>
                    <Form.Group controlId="instructor">
                    <Form.Label>Бонус</Form.Label>
                    <Form.Control
                        type="text"
                        name="instructor"
                        value={formData?.bonus || ''}
                        onChange={handleInputChange}
                        placeholder="Введите бонус"
                    />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="duration">
                    <Form.Label>Стоимость обслуживания</Form.Label>
                    <Form.Control
                        type="number"
                        name="duration"
                        value={formData?.cost || ''}
                        onChange={handleInputChange}
                        placeholder="Стоимость обслуживания (руб./мес.)"
                    />
                    </Form.Group>
                </Col>
                </Row>

                {id != '0' && (
                    <Form.Group controlId="image" className="mt-3">
                        <Form.Label>Изображение</Form.Label>
                        <Form.Control
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {imagePreview ? (
                            <Image 
                            src={imagePreview} 
                            alt="Preview" 
                            fluid
                            style={{ maxWidth: '400px', maxHeight: '400px', marginTop: '10px' }}
                            />
                        ) : (
                            <Image 
                            src={data?.imageUrl || ''} 
                            alt="Preview" 
                            fluid
                            style={{ maxWidth: '400px', maxHeight: '400px', marginTop: '10px' }}
                            />
                        )}
                    </Form.Group>
                )}

                <Form.Group controlId="description" className="mt-3">
                <Form.Label>Описание</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData?.description || ''}
                    onChange={handleInputChange}
                    placeholder="Введите описание"
                />
                </Form.Group>

                <div className="mt-4 d-flex justify-content-between">
                    <Button variant="danger" onClick={handleSubmit}>
                        Сохранить изменения
                    </Button>
                    {imageFile && id != '0' && (
                        <Button variant="danger" onClick={handleImageUpdate}>
                            Обновить изображение
                        </Button>
                    )}
                    <Button variant="light" onClick={() => navigate(ROUTES.OFFERSTABLE)}>
                        Отмена
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default OfferEditPage;
