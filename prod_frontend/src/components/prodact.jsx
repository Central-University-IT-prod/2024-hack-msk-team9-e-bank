import React, { useState, useEffect } from 'react';
import { Input, Button, Form, Card, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from "./header";

const { TextArea } = Input;
const { Title } = Typography;

const Prodact = function ({ selectedGroups = [], editorFile, stage }) {
    const navigate = useNavigate(); // Хук для навигации
    const handleNext = () => {
        message.success('Кампания подтверждена');
        navigate('/main'); // Переход на /home
    };
    const [goal, setGoal] = useState('');
    const [topic, setTopic] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [editorComment, setEditorComment] = useState('');  // Комментарий для редактора
    const [analyticComment, setAnalyticComment] = useState('');  // Комментарий для аналитика

    useEffect(() => {
        // Если все шаги выполнены, делаем кнопку Apply зеленой
        if (selectedGroups.length > 0 && editorFile && goal && topic) {
            setIsComplete(true);
        } else {
            setIsComplete(false);
        }
    }, [selectedGroups, editorFile, goal, topic]);

    // Обработчики изменения полей
    const handleGoalChange = (e) => setGoal(e.target.value);
    const handleTopicChange = (e) => setTopic(e.target.value);

    // Обработчики изменения комментариев
    const handleEditorCommentChange = (e) => setEditorComment(e.target.value);
    const handleAnalyticCommentChange = (e) => setAnalyticComment(e.target.value);

    // Обработчик для скачивания файла редактора
    const handleDownload = () => {
        if (editorFile) {
            const url = URL.createObjectURL(new Blob([editorFile]));
            const link = document.createElement('a');
            link.href = url;
            link.download = editorFile.name;
            link.click();
        }
    };

    return (
        <><Header/>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Card style={{ maxWidth: '600px', width: '100%', padding: '20px', boxShadow: '0px 4px 8px rgba(0,0,0,0.2)' }}>
                <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
                    Подтверждение рассылки
                </Title>
                
                <Form layout="vertical">
                    <Form.Item label="Введите цели и тему рассылки:">
                        <TextArea 
                            rows={2}
                            placeholder="Введите цель и тему"
                            value={goal}
                            onChange={handleGoalChange}
                        />
                    </Form.Item>

                    <Form.Item label="Выбранные группы:">
                        {selectedGroups.length > 0 ? (
                            selectedGroups.map((group, index) => (
                                <p key={index} style={{ margin: '4px 0' }}>{group}</p>
                            ))
                        ) : (
                            <p>Группы не выбраны</p>
                        )}
                    </Form.Item>

                    <Form.Item label="Файл от редактора:">
                        {editorFile ? (
                            <Button type="link" onClick={handleDownload}>
                                Скачать {editorFile.name}
                            </Button>
                        ) : (
                            <p>Файлы не выбраны</p>
                        )}
                    </Form.Item>

                    <Form.Item label="Комментарий для редактора:">
                        <TextArea
                            rows={2}
                            placeholder="Введите комментарий для редактора"
                            value={editorComment}
                            onChange={handleEditorCommentChange}
                        />
                    </Form.Item>

                    <Form.Item label="Комментарий для аналитика:">
                        <TextArea
                            rows={2}
                            placeholder="Введите комментарий для аналитика"
                            value={analyticComment}
                            onChange={handleAnalyticCommentChange}
                        />
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'center' }}>
                        <Button
                            type="primary"
                            style={{
                                backgroundColor: isComplete ? 'green' : 'gray',
                                borderColor: isComplete ? 'green' : 'gray',
                                color: 'white',
                            }}
                            disabled={!isComplete}
                            onClick={handleNext()}
                        >
                            Apply
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div></>
    );
};

export default Prodact;
