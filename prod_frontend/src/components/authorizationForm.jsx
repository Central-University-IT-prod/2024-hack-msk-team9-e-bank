import React, { useState } from 'react';
import { Form, Input, Button, Steps, message } from 'antd';
import authStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
const { Step } = Steps;

const AuthorizationForm = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const next = () => {

        setCurrent(current + 1);


  };

  const prev = () => {
    if (current === 1) {
      form.setFieldsValue({ password: '' }); // Очищаем поле пароля, если возвращаемся на предыдущий шаг
    }
    setCurrent(current - 1); // Переход на предыдущий шаг
  };

  const onFinish = async (values) => {
      setLoading(true);

      console.log(values.email, values.password)
      await authStore.login(values.email, values.password)
      console.log(authStore.isAuthenticated)
      if (authStore.isAuthenticated) {
        navigate('/'); // Переход на главную страницу после успешного входа

      }

      setLoading(false); // Сбрасываем состояние загрузки обратно в false



  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh', // Вся высота - высота header'а
      }}
    >
      <div style={{ maxWidth: 600, width: '100%' }}>
        <Steps current={current}>
          <Step />
          <Step />
        </Steps>
        <div style={{ marginTop: 20 }}>
          <Form
            form={form}
            onFinish={onFinish}
            initialValues={{}}
            layout="vertical"
          >
          <Form.Item
            name="email"
            label="Почта"
            rules={[{ required: true, type: 'email', message: 'Просьба использовать действующую почту' }]}
            style={{ display: current === 0 ? 'block' : 'none' }}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Пароль"
            rules={[{  required: true,message: 'Поле необходимо к заполнению' }]}
            style={{ display: current === 1 ? 'block' : 'none' }}>
            <Input.Password  />
          </Form.Item>


            <div style={{ marginTop: 20 }}>
              {current > 0 && (
                <Button style={{ marginRight: 8 }} onClick={prev}>
                  Вернуться
                </Button>
              )}
              {current < 1 ? (
                <Button type="primary" onClick={next}>
                  Далее
                </Button>
              ) : (
                <Button type="primary" htmlType="submit" >
                  Войти
                </Button>
              )}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AuthorizationForm;
