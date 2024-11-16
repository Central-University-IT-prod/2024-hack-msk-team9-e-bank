import React, {useState} from 'react';
import { Layout, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import authStore from '../store/authStore';

import { useNavigate } from 'react-router-dom';
const { Header } = Layout;
const { Text } = Typography;

const CustomHeader = ({ user }) => {


  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    authStore.logout(); // Выход из аккаунта
    navigate('/authorization'); // Перенаправление на страницу авторизации
    setLoading(false);
  };

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#001529', padding: '0 20px', height: '10vh'}}>
      {/* Лого */}
      <div style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>
        MyLogo
      </div>

      {/* Информация о пользователе - отображается только если user передан */}
      {user && (
        <div style={{ display: 'flex', alignItems: 'center' }} onClick={handleLogout}>
          <div style={{ textAlign: 'right', marginRight: '10px', color: '#fff' }}>
            <Text style={{ display: 'block', fontSize: '16px', color: '#fff' }}>{user.fullName}</Text>
            <Text style={{ display: 'block', fontSize: '12px', color: '#d9d9d9' }}>{user.email}</Text>
          </div>
          <Avatar icon={<UserOutlined />} />
        </div>
      )}
    </Header>
  );
};

export default CustomHeader;
