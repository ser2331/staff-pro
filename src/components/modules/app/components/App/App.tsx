import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../core/redux';
import { authorizationSlice } from '../../../authorization/AuthorizationSlice';
import { AuthPage } from '../../../../pages/AuthPage/AuthPage';
import { HomePage } from '../../../../pages/HomePage/HomePage';

import s from './App.module.scss';

const { setIsAuth } = authorizationSlice.actions;

export const App = () => {
    const dispatch = useAppDispatch();
    const { arrayUsers } = useAppSelector(state => state.authorizationReducer);
    const { isAuth } = useAppSelector(state => state.authorizationReducer);

    let login = '';
    let password = '';
    const loginJson = window.localStorage && window.localStorage.getItem('LOGIN');
    const passwordJson = window.localStorage && window.localStorage.getItem('PASSWORD');
    if (typeof loginJson === 'string' && typeof passwordJson === 'string') {
        try {
            login = JSON.parse(loginJson);
            password = JSON.parse(passwordJson);
            // eslint-disable-next-line no-empty
        } catch (e) {
        }
    }

    useEffect(() => {
        if (login && password) {
            const userAdmin = arrayUsers.find((el) => el.login === login && el.password === password)
            if (userAdmin) {
                dispatch(setIsAuth(true));
            }
        }
        return;
    }, [login, password, arrayUsers])

    return (
        <div className={s.App}>
            {isAuth ? <HomePage /> : <AuthPage />}
        </div>
    );
};