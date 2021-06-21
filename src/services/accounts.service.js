import { authHeader } from '../_helpers';
import { handleResponse } from '../_helpers';
import { catchErrors } from '../_helpers';
import axios from 'axios';

export const accountsService = {
    getAll,
    get,
    edit,
    getAllAccountGroups
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

function edit(id, account) {

    return axios.put(`/accounts/${id}`, account, { params:{}, headers: authHeader()})
    .then(handleResponse)
    .catch(catchErrors);
}



function getAllAccountGroups() {
    return axios.get(`/accountgroups`, { params:{}, headers: authHeader()})
    .then(handleResponse)
    .then(data => {
        return data;
    }).catch(catchErrors);
}