import React, { useState } from 'react';
import { Form, Input, Button, Steps, message } from 'antd';
import authStore from "../store/authStore";
import {useNavigate} from "react-router-dom";
import { useLocation } from 'react-router-dom';
const { Step } = Steps;

const RegistrationForm = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(null);
  const location = useLocation(); // Получаем объект локации
  const searchParams = new URLSearchParams(location.search); // Извлекаем параметры из query строки
  const role = searchParams.get('role');
  const mailing_token = searchParams.get('token'); // Получаем значение параметра token
  console.log('role: ', role, 'token: ', mailing_token)

  const token_validate =  async (role, mailing_token) => {
      await fetch(`/api/reg/token_validate?role=${role}&?token=${mailing_token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          role: role,
          mailing_token: mailing_token
        })
    }).then(response => response.json())
      .then(data => {
          console.log(data)
          if (data.status === "ok") {
            setIsValidToken(true)
          } else {
              message.warning('Несуществующий токен');

              setIsValidToken(false)
          }
      });
    }





  const next = () => {
  setCurrent(current + 1);
  };

  const prev = () => {
    if (current === 2) {
      form.setFieldsValue({ password: '' }); // Очищаем поле пароля, если возвращаемся на предыдущий шаг
    }
    setCurrent(current - 1); // Переход на предыдущий шаг
  };


  const onFinish = async (values) => {
    // console.log(values)

    try {
      await authStore.register(values.email, values.password, values.fullName, role, mailing_token)
      await authStore.login(values.email, values.password)
      // console.log(authStore.isAuthenticated)
      if (authStore.isAuthenticated) {
        navigate('/main'); // Переход на главную страницу после успешного входа
      }

    } catch (error){
       message.warning('Такой пользователь уже существует');
    }

    setLoading(false);

  };

  console.log(mailing_token)
  if ( mailing_token){
       token_validate(mailing_token, role)
  }

  if (mailing_token !== null && !isValidToken) {
    // Отображение состояния загрузки
    return <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh', // Вся высота - высота header'а
        }}
    >
      <p>Форма недоступна</p>
    </div>;
      }


      return (
      <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh', // Вся высота - высота header'а
          }}>
        <div style={{maxWidth: 600, width: '100%'}}>
          <Steps current={current}>
            <Step/>
            <Step/>
            <Step/>
          </Steps>
          <div style={{marginTop: 20}}>
            <Form
                form={form}
                onFinish={onFinish}
                initialValues={{}}
                layout="vertical"
            >
              <Form.Item
                  name="fullName"
                  label="ФИО"
                  rules={[{required: true, message: 'Поле необходимо к заполнению'}]}
                  style={{display: current === 0 ? 'block' : 'none'}}
              >
                <Input placeholder="Иванов Иван Иванович"/>
              </Form.Item>

              <Form.Item
                  name="email"
                  label="Почта"
                  rules={[{required: true, type: 'email', message: 'Просьба использовать действующую почту'}]}
                  style={{display: current === 1 ? 'block' : 'none'}}
              >
                <Input placeholder="Email"/>
              </Form.Item>

              <Form.Item
                  name="password"
                  label="Пароль"
                  rules={[{required: true, message: 'Поле необходимо к заполнению'}]}
                  style={{display: current === 2 ? 'block' : 'none'}}
              >
                <Input.Password/>
              </Form.Item>


              <div style={{marginTop: 20}}>
                {current > 0 && (
                    <Button style={{marginRight: 8}} onClick={prev}>
                      Вернуться
                    </Button>
                )}
                {current < 2 ? (
                    <Button type="primary" onClick={next}>
                      Далее
                    </Button>
                ) : (
                    <Button type="primary" htmlType="submit">
                      Подтвердить
                    </Button>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
      );
      };

      export default RegistrationForm;
