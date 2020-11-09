import axios from 'axios';
import { handleResponse } from '../_helpers';
import { catchErrors } from '../_helpers';
export const loginService = {
    login,
    logout,
    register,
};

function login(username, password) {
    return  axios.post(`/Login/Authenticate`, JSON.stringify({ username, password }), { headers: { 'Content-Type': 'application/json' }})
        .then(handleResponse)
        .then(token=> {
            // login successful if there's a jwt token in the response
            if (token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('jwt-token', JSON.stringify(token));
            }

            return token;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('jwt-token');
}

function register(user) {
    return  axios.post(`/Login/Register`, JSON.stringify(user), { headers: { 'Content-Type': 'application/json' }})
    .then(handleResponse)
    .catch(catchErrors);
   
}