import React, { useState } from 'react';
import { Input, Button, Form, Card, Typography } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Header from "./header";
const { TextArea } = Input;
const { Title } = Typography;
const text = "bla bla bla...";
const select_groups = [
    "new_people", "girllls"
]
const Marketolog = function ({ spisok }) {
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
        <><Header/>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Card style={{ maxWidth: '600px', width: '100%', padding: '20px', boxShadow: '0px 4px 8px rgba(0,0,0,0.2)' }}>
                <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
                    Редактирование рассылки
                </Title>
                <Form layout="vertical">
                    <Form.Item label="Цели и тема рассылки:">
                        {text}
                    </Form.Item>
                    <Form.Item label="Выбранные группы:">
                        {Array.isArray(select_groups) && select_groups.map((group, index) => (
                            <p key={index} style={{ margin: '4px 0' }}>{group}</p>
                        ))}
                    </Form.Item>

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
        </div></>
    );
};

export default Marketolog;