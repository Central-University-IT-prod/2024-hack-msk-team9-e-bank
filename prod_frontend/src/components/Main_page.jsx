import React, { useState } from 'react';
import { Card, Button, Typography, List } from 'antd';
import Header from "./header";
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

const MainPageProdact = () => {
    const navigate = useNavigate(); // Хук для навигации
    const handleNext = () => {
        navigate('/prodact'); 
    };
    const [campaigns, setCampaigns] = useState([
        // Пример данных кампании; заменить на данные, полученные с сервера
        { id: 1, stage: 'Аналитик', topic: 'Новая рассылка', date: '2024-11-10' },
        { id: 2, stage: 'Редактор', topic: 'Обновления', date: '2024-11-08' },
    ]);

    const handleCreateCampaign = () => {
        // Навигация к странице создания новой рассылки
        // Пример: navigate('/create-campaign');
    };

    return (
        <><Header/>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <div style={{ width: '100%', maxWidth: '600px' }}>
                <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
                    Список рассылок
                </Title>
                
                <Button 
                    type="primary" 
                    style={{ marginBottom: '20px', width: '100%' }} 
                    onClick={handleNext}
                >
                    Создать новую рассылку
                </Button>
                
                <List
                    dataSource={campaigns}
                    renderItem={(campaign) => (
                        <Card style={{ marginBottom: '10px' }} key={campaign.id}>
                            <p><strong>Этап:</strong> {campaign.stage}</p>
                            <p><strong>Тема:</strong> {campaign.topic}</p>
                            <p><strong>Дата создания:</strong> {campaign.date}</p>
                        </Card>
                    )}
                />
            </div>
        </div></>
    );
};

export default MainPageProdact;
