import React, { createContext, useEffect, useReducer, useState } from "react";
import { LoginData, LoginResponse, RegisterData, User } from '../interfaces/ILogin';
import { AuthState, authReducer } from "./authReducer";
import loginAPI from "../api/loginAPI";
import AsyncStorage from '@react-native-async-storage/async-storage';


type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: User | null;
    status: 'cheking' | 'authenticated' | 'not-authenticated';
    singUp: (registerData: RegisterData) => void;
    singIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}


const authInitialState: AuthState = {
    status: 'cheking',
    token: null,
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {


    const [state, dispatch] = useReducer(authReducer, authInitialState);


    useEffect(() => {
        checkToken();
    }, []);

    async function checkToken() {

        const token = await AsyncStorage.getItem('token');

        if (!token) return dispatch({ type: 'notAuthenticated' });
        try {
            const resp = await loginAPI.get('/validateToken');

            if (resp.status !== 200) {
                return dispatch({ type: 'notAuthenticated' })
            }

            await AsyncStorage.setItem('token', resp.data.token);
            dispatch({
                type: 'singUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.user
                }
            });
        } catch (error) {
            return dispatch({ type: 'notAuthenticated' })
        }

    }

    const singUp = async ({ email, password, username }: RegisterData) => {
        try {
            const resp = await loginAPI.post<LoginResponse>('/register', { email, password, username });
            dispatch({
                type: 'singUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.user
                }
            })
            await AsyncStorage.setItem('token', resp.data.token);
        } catch (error: any) {
            dispatch({
                type: "addError",
                payload: error.response.data.message || 'El correo ya esta registrado'
            })
        }

    };

    const singIn = async ({ email, password }: LoginData) => {
        try {
            const resp = await loginAPI.post<LoginResponse>('/login', { email, password }
            
            );
            
            dispatch({
                type: 'singUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.user
                }
            });
            await AsyncStorage.setItem('token', resp.data.token);
        } catch (error: any) {
            console.log(error);
            dispatch({
                type: "addError",
                payload: error.response.data.message || 'Información incorrecta'
            })
        }
    };
    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' });
    };

    const removeError = () => {
        dispatch({
            type: 'removeError',
        }
        )

    };

    return (
        <AuthContext.Provider value={{
            ...state,
            singUp,
            singIn,
            logOut,
            removeError
        }}>
            {children}
        </AuthContext.Provider>

    )
}