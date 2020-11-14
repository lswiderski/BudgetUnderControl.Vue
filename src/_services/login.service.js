import axios from 'axios';
import { catchErrors, handleResponse, authHeader} from '../_helpers';
export const loginService = {
    login,
    logout,
    register,
    activate,
    resetActivationCode,
};
 function login(username, password) {
    return axios.post(`/Login/Authenticate`, JSON.stringify({ username, password }), { headers: { 'Content-Type': 'application/json' } })
        .then(handleResponse)
        .then(async(token) => {
            // login successful if there's a jwt token in the response
            if (token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('jwt-token', JSON.stringify(token));
                // call for user Identity
                await getUserIdentityContext();
            }

            return token;
        });
}

async function getUserIdentityContext() {
    await axios.get('/Users/IdentityContext', { params:{}, headers: authHeader()})
        .then(handleResponse)
        .then(user => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('jwt-token');
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
            await getUserIdentityContext();
        });
}

function resetActivationCode() {
    return axios.post(`/Users/ResetActivation`,null,{ params:{},headers: authHeader() })
        .then(handleResponse)
        .then(async() => {
        })
    }