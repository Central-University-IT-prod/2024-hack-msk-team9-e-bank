import React, { useState } from 'react';
import { Select, Input, Button, Form, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from "./header";

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const groups = [
    "new_people", "girllls", "The BOYS"
];
const text = "bla bla bla...";

const Analitic = function () {
    const [target, setTarget] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [comment, setComment] = useState('');
    const navigate = useNavigate(); // Хук для навигации

    // Обработчики изменений полей
    const handleTargetChange = (e) => setTarget(e.target.value);
    const handleGroupChange = (value) => setSelectedGroup(value);
    const handleCommentChange = (e) => setComment(e.target.value);

    // Обработчик нажатия кнопки "Далее"
    const handleNext = () => {
        navigate('/main'); // Переход на /home
    };

    return (
        <>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <Card style={{ maxWidth: '600px', width: '100%', padding: '20px', boxShadow: '0px 4px 8px rgba(0,0,0,0.2)' }}>
                    <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
                        Настройка цели рассылки
                    </Title>
                    <Form layout="vertical">
                        <Form.Item label="Цели рассылки:">
                            {text}
                        </Form.Item>

                        <Form.Item label="Выбор группы людей">
                            <Select
                                mode="multiple"
                                placeholder="Выберите группу:"
                                onChange={handleGroupChange}
                                style={{ width: '100%' }}
                            >
                                {Array.isArray(groups) && groups.map((group, index) => (
                                    <Option key={index} value={group}>
                                        {group}
                                    </Option>
                                ))}
                            </Select>
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
                            <Button type="primary" onClick={handleNext}>
                                Далее
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    );
}

export default Analitic;