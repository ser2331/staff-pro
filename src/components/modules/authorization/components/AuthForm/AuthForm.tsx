import React, { FC, useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { IAuth } from '../../interfaces/authorizationInterface';
import { useAppDispatch, useAppSelector } from '../../../../core/redux';
import { searchUser } from '../../halpers/halpers';
import { authorizationSlice } from '../../AuthorizationSlice';
import { Link } from 'react-router-dom';
import { routes } from '../../../../types';

import s from './AuthForm.module.scss';

const { setIsAuth, setUser } = authorizationSlice.actions;

interface IAuthForm {
  setErrorMessage: (e: string) => void;
}

export const AuthForm: FC<IAuthForm> = ({ setErrorMessage }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [numberAttempts, setNumberAttempts] = useState(0);
  const [isDisabled, setDisabled] = useState(false);

  const { arrayUsers } = useAppSelector((state) => state.authorizationReducer);
  const mes1 = t('insufficient_rights');
  const mes2 = t('user_not_found');

  const redirect = () => {
    dispatch(setIsAuth(true));
  };

  const setCurrentUser = (user: IAuth) => {
    dispatch(setUser(user));
  };

  const onFinish = (values: IAuth) => {
    setNumberAttempts(numberAttempts + 1);
    searchUser(arrayUsers, values, setErrorMessage, setCurrentUser, redirect, mes1, mes2);
  };

  const onFinishFailed = () => {
    setNumberAttempts(numberAttempts + 1);
  };

  useEffect(() => {
    if (numberAttempts > 3) {
      setDisabled(true);
      const handler = setTimeout(() => {
        setErrorMessage('');
        setDisabled(false);
        setNumberAttempts(0);
      }, 3000);
      setErrorMessage(t('number_login_attempts_exceeded'));

      return () => clearTimeout(handler);
    }
  }, [numberAttempts]);

  return (
    <Form
      className={s.AuthForm}
      name='basic'
      initialValues={{ remember: false }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      layout='vertical'
      requiredMark={false}
    >
      <Form.Item
        label={t('email_address')}
        name='login'
        rules={[
          { required: true, message: t('required_field') },
          {
            min: 4,
            message: t('password_between_4_and_64_characters'),
          },
          {
            max: 64,
            message: t('login_between_4_and_64_characters'),
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t('password')}
        name='password'
        rules={[
          { required: true, message: t('required_field') },
          {
            min: 4,
            message: t('password_between_4_and_64_characters'),
          },
          {
            max: 64,
            message: t('password_between_4_and_64_characters'),
          },
        ]}
      >
        <Input.Password style={{ padding: '0 12px' }} />
      </Form.Item>

      <div className={s.rememberMeWrapper}>
        <Form.Item name='remember' valuePropName='checked'>
          <Checkbox>{t('to_remember_me')}</Checkbox>
        </Form.Item>

        <Link to={routes.forgotPassword} className={s.linkBtn}>
          {t('forgot_your_password')}
        </Link>
      </div>

      <Button type='primary' htmlType='submit' disabled={isDisabled}>
        {t('to_come_in')}
      </Button>
    </Form>
  );
};
