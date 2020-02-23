import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import NavLink from '../../components/NavLink/NavLink';
import getDiffpx from '../../tools/getDiffpx';

import './Register.css';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const POST_USER = gql`
  mutation createUser($name: String!, $password: String!, $email: String!) {
    createUser(name: $name, password: $password, email: $email) {
      name
      id
    }
  }
`;

const Register = props => {
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: ''
  });
  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  const [postUser] = useMutation(POST_USER);
  const onSubmit = () => {
    postUser({
      variables: inputs
    })
      .then(res => {
        // console.log('res', res);
        props.history.push('/login');
      })
      .catch(err => {
        // console.log(err);
        if (err.graphQLErrors.length > 0) {
          const { code, errors } = err.graphQLErrors[0].extensions;
          code === 'BAD_USER_INPUT' && setErrors(errors);
        } else setErrors({ ...errors, password: err.networkError.message });
      });
  };

  return (
    <div className="Register">
            <form onSubmit={onSubmit}>
						<div className="form-group mx-auto">
							<input
								style={{
									marginTop: '40px'
								}}
								className="mx-auto"
								type="text"
								error={errors.name}
								name="name"
								placeholder="Имя пользователя"
								value={inputs.name}
								onChange={onChange}
							/>
							<input
								style={{
									marginTop: `${getDiffpx(errors.name, 40)}px`
								}}
								error={errors.email}
								className="mx-auto"
								type="email"
								name="email"
								placeholder="Эл. Почта"
								value={inputs.email}
								onChange={onChange}
							/>
							<input
								style={{
									marginTop: `${getDiffpx(errors.email, 40)}px`
								}}
								className="mx-auto"
								error={errors.password}
								type="password"
								name="password"
								placeholder="Пароль"
								value={inputs.password}
								onChange={onChange}
							/>
							<button
								onClick={onSubmit}
								variant="link"
								size="lg"
								className="button-login"
							>
								<span className="button-text text-login">
									Зарегистрироваться
								</span>
							</button>
							<NavLink
								className="button-register"
								to="/login"
							>
								<span className="button-text text-login"> Уже есть аккаунт? Войти</span>
							</NavLink>
							</div>
            </form>

    </div>
  );
};

export default Register;
