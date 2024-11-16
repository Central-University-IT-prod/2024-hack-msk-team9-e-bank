import React, { useState } from 'react';
import { Input, Button, Form, Card, Typography, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { TextArea } = Input;
const { Title } = Typography;
const { Dragger } = Upload;
const text = "bla bla bla...";

const Main_Editor = function ({ file }) {
    const navigate = useNavigate(); // Хук для навигации
    const handleNext = () => {
        navigate('/main'); // Переход на /home
    };
    const [comment, setComment] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);

    // Обработчик изменения комментария
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    // Обработчик скачивания файла
    const handleDownload = () => {
        if (uploadedFile) {
            const url = URL.createObjectURL(new Blob([uploadedFile.originFileObj]));
            const link = document.createElement('a');
            link.href = url;
            link.download = uploadedFile.name;
            link.click();
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Card style={{ maxWidth: '600px', width: '100%', padding: '20px', boxShadow: '0px 4px 8px rgba(0,0,0,0.2)' }}>
                <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
                    Редактирование рассылки
                </Title>
                <Form layout="vertical">
                    <Form.Item label="Цели и тема рассылки:">
                        {text}
                    </Form.Item>

                    {/* Отображаем файл, переданный через props (например, файл, который загрузил продукт) */}
                    {file && (
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <p>Файл продукта: {file.name}</p>
                            <Button type="link" onClick={() => console.log("Скачивание работы редактора")}>
                                Скачать
                            </Button>
                        </div>
                    )}
                    <Form.Item label="Комментарий:">
                        <TextArea
                            rows={4}
                            placeholder="Оставьте свой комментарий"
                            value={comment}
                            onChange={handleCommentChange}
                        />
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'center' }}>
                        <Button
                            style={{ marginRight: '10px', backgroundColor: '#FFA500', borderColor: '#FFA500', color: 'white' }}
                            onClick={() => console.log("Функция возвращения еще не реализована")}
                        >
                            Вернуть
                        </Button>
                        <Button type="primary" onClick={handleNext}>
                            Далее
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Main_Editor;