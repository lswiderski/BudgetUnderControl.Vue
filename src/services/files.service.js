import { authHeader } from '../_helpers';
import { handleResponse } from '../_helpers';
import { catchErrors } from '../_helpers';
import axios from 'axios';

export const filesService = {
    add,
    remove
};

function add(file) {
    const formData = new FormData();

    formData.append("files", file, file.name);
    const headers =  {...authHeader(), 'Content-Type': 'multipart/form-data'};
    return axios.post(`/files`,formData, { params:{}, headers})
    .then(handleResponse)
    .catch(catchErrors);
}

function remove(guid) {
    return axios.delete(`/files/${guid}`, { params:{}, headers: authHeader()})
    .then(handleResponse)
    .catch(catchErrors);
}