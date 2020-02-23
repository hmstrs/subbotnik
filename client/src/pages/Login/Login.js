import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const LOGIN_USER = gql`
  query login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      token
    }
  }
`;

const Login = props => {
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  const [loginUser] = useLazyQuery(LOGIN_USER, {
    onCompleted: data => {
      if (data) {
        const { token } = data.login;
        localStorage.setItem('token', token);
        window.location.reload(false);
      }
    },
    onError: err => {
      console.log(err);

      if (err.graphQLErrors.length > 0) {
        const { code, errors } = err.graphQLErrors[0].extensions;
        code === 'BAD_USER_INPUT' && setErrors(errors);
      } else setErrors({ ...errors, password: err.networkError.message });
    }
  });

  const loginUserHelper = async () => {
    await loginUser({
      variables: inputs
    });
  };
  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmit = () => {
    loginUserHelper();
  };

  return (
    <div className="Login">
      <div>
        <form onSubmit={onSubmit}>
          <div className="form-group mx-auto">
            <input
              error={errors.email}
              type="email"
              name="email"
              placeholder="Эл. Почта"
              value={inputs.email}
              onChange={onChange}
            />
            <input
              error={errors.password}
              type="password"
              name="password"
              placeholder="Пароль"
              value={inputs.password}
              onChange={onChange}
            />
            <button onClick={onSubmit} className="button-login">
              <span className="button-text text-login">Войти</span>
            </button>
            <div>
              <Link className="button-register" to="/register">
                Нет аккаунта? Регистрация
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div></div>
    </div>
  );
};
export default Login;
