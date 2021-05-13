import axios from 'axios';
import { catchErrors, handleResponse, authHeader} from '../_helpers';
export const loginService = {
    login,
    logout,
    register,
    activate,
    resetActivationCode,
    getUserIdentityContext
};
 function login(username, password) {
    return axios.post(`/Login/Authenticate`, JSON.stringify({ username, password }), { headers: { 'Content-Type': 'application/json' } })
        .then(handleResponse)
        .then(async(token) => {
            // login successful if there's a jwt token in the response
            if (token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('jwt-token', JSON.stringify(token));
            }
            return token;
        })
        .then(async (token) => {
           const user = await getUserIdentityContext();
           return {token, user};
        });
}

 function getUserIdentityContext() {
    return axios.get('/Users/IdentityContext', { params:{}, headers: authHeader()})
        .then(handleResponse)
        .then(async user => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('jwt-token');
    localStorage.removeItem('user');
}

function register(user) {
    return axios.post(`/Login/Register`, JSON.stringify(user), { headers: { 'Content-Type': 'application/json' } })
        .then(handleResponse)
        .catch(catchErrors);
}

function activate(code) {
    return axios.post(`/Users/Activate`, {code}, { headers: authHeader() })
        .then(handleResponse)
        .then(async () => {
            const user = await getUserIdentityContext();
            return user;
        });
}

function resetActivationCode() {
    return axios.post(`/Users/ResetActivation`,null,{ params:{},headers: authHeader() })
        .then(handleResponse)
        .then(async() => {
        })
    }