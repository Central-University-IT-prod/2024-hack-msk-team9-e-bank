import { makeAutoObservable } from 'mobx';
import {message} from "antd";

class AuthStore {
  isAuthenticated = false;
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  async login(email, password) {
      await fetch('/worker/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
    }).then(response => response.json())
      .then(data => {
          console.log(data)
          if (data.status === "ok") {
              message.success('Успешный вход');
              console.log("Вход успешно выполнен");
              this.isAuthenticated = true;
              this.user = { email: email, fullName: data.fio };
          } else {
              message.warning('Неправильный логин или пароль');
              console.log(data.error);

          }
      });

  }
  async register(email, password, fio, role, mailing_token) {
      console.log(role, mailing_token)
      await fetch('http://127.0.0.1:8089/worker/reg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          fio: fio
        })
    }).then(response => response.json())
      .then(data => {
          console.log(data)
          if (data.status === "ok") {
              message.success('Успешная регистрация');
              console.log("Успешная регистрация");

          } else {

              console.log(data.error);
              throw new Error(data.error);
          }
      });

  }

  logout() {
    this.isAuthenticated = false;
    console.log('Выход из аккаунта', this.isAuthenticated)
    this.user = null;
  }
}

const authStore = new AuthStore();
export default authStore;
