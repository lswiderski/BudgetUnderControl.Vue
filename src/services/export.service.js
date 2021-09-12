import { authHeader } from '../_helpers';
import { handleResponse } from '../_helpers';
import { catchErrors } from '../_helpers';
import axios from 'axios';

export const exportService = {
    getTransactionsCSV,
    getTransactionsExcel,

};

function getTransactionsCSV(filters) {
    const params = { filters, Type: 'CSV'};
    const Qs = require('qs');
    return axios.get(`/exporter/transactions`, { params: params, headers: authHeader(),paramsSerializer: function(params) {
        return Qs.stringify(params, {arrayFormat: 'repeat', allowDots: true})
    }})
    .then(handleResponse)
    .then(data => {
        const blob = new Blob([data], { type: 'blob' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = "Report.csv"
        link.click()
        URL.revokeObjectURL(link.href)
    }).catch(catchErrors);
}

function getTransactionsExcel(filters) {
    const params = { filters, Type: 'Excel'};
    const Qs = require('qs');
    return axios.get(`/exporter/transactions`, { params: params, headers: authHeader(),paramsSerializer: function(params) {
        return Qs.stringify(params, {arrayFormat: 'repeat', allowDots: true})
    }})
    .then(handleResponse)
    .then(data => {
        const blob = new Blob([data], { type: 'blob' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = "Report.xlsx"
        link.click()
        URL.revokeObjectURL(link.href)
    }).catch(catchErrors);
}
