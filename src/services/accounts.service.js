import { authHeader } from '../_helpers';
import { handleResponse } from '../_helpers';
import { catchErrors } from '../_helpers';
import axios from 'axios';

export const accountsService = {
    getAll,
    get,
    getDetails,
    edit,
    add,
};

function getAll() {

    return axios.get(`/accounts`, { params:{}, headers: authHeader()})
    .then(handleResponse)
    .then(data => {
        return data;
    }).catch(catchErrors);
}

function get(id) {
    return axios.get(`/accounts/${id}`, { params:{}, headers: authHeader()})
    .then(handleResponse)
    .catch(catchErrors);
}

function getDetails(id) {
    return axios.get(`/accounts/${id}/details`, { params:{}, headers: authHeader()})
    .then(handleResponse)
    .catch(catchErrors);
}

function edit(id, account) {
    return axios.put(`/accounts/${id}`, account, { params:{}, headers: authHeader()})
    .then(handleResponse)
    .catch(catchErrors);
}

function add(account) {
    return axios.post(`/accounts`, account, { headers: authHeader()})
    .then(handleResponse)
    .catch(catchErrors);
}