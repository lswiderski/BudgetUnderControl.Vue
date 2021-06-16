import { authHeader } from '../_helpers';
import { handleResponse } from '../_helpers';
import { catchErrors } from '../_helpers';
import axios from 'axios';

export const usersService = {
    getAll,
    get,
    edit,
    resetActivationCode,
};

function getAll() {
    return axios.get(`/users`, { params:{}, headers: authHeader()})
    .then(handleResponse)
    .then(data => {
        return data;
    }).catch(catchErrors);
}

function get(guid) {
    return axios.get(`/users/${guid}`, { params:{}, headers: authHeader()})
    .then(handleResponse)
    .catch(catchErrors);
}

function edit(guid, command) {
    return axios.put(`/users/${guid}`,command, { params:{}, headers: authHeader()})
    .then(handleResponse)
    .catch(catchErrors)

}

function resetActivationCode(guid) {
    return axios.post(`/users/${guid}/ResetActivation`,null,{ params:{},headers: authHeader() })
        .then(handleResponse)
        .then(async() => {
        })
    }
