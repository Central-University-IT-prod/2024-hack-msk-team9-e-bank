import React from 'react';
import { Form, Input, Button, Checkbox, Select, notification } from 'antd';

const { Option } = Select;

const RegistrationForm = () => {
  const onFinish = (values) => {
    console.log('Received values: ', values);
    notification.success({
      message: 'Регистрация прошла успешно!',
      description: 'Вы успешно зарегистрировались!',
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', paddingTop: '50px' }}>
      <h2>Регистрация</h2>
      <Form
        name="registration"
        onFinish={onFinish}
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Пожалуйста, введите ваше имя!' }]}
        >
          <Input placeholder="Имя пользователя" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Пожалуйста, введите ваш email!' },
            { type: 'email', message: 'Неверный формат email!' },
          ]}
        >
          <Input placeholder="Электронная почта" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Пожалуйста, введите ваш пароль!' },
            { min: 6, message: 'Пароль должен содержать минимум 6 символов!' },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Пожалуйста, подтвердите ваш пароль!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Пароли не совпадают!');
              },
            }),
          ]}
        >
          <Input.Password placeholder="Подтверждение пароля" />
        </Form.Item>

        <Form.Item
          name="role"
          rules={[{ required: true, message: 'Пожалуйста, выберите роль!' }]}
        >
          <Select placeholder="Выберите вашу роль">
            <Option value="user">Пользователь</Option>
            <Option value="admin">Администратор</Option>
          </Select>
        </Form.Item>

        <Form.Item name="terms" valuePropName="checked" rules={[{ required: true, message: 'Вы должны согласиться с условиями!' }]}>
          <Checkbox>
            Я согласен с <a href="#">условиями</a>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrationForm;