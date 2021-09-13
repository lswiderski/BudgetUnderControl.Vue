import { authHeader } from '../_helpers';
import { handleResponse } from '../_helpers';
import { catchErrors } from '../_helpers';
import axios from 'axios';

export const exportService = {
    getTransactions,
};

function getTransactions(filters, type) {
    let name = '';
    switch (type) {
        case 'CSV':
            name = 'Report.csv';
            break;
        case 'Excel':
            name = 'Report.xlsx';
            break;
        default:
            name = 'Report';
            break;
    }
    const params = { filters, Type: type };
    const Qs = require('qs');
    return axios.get(`/exporter/transactions`, {
        params: params, headers: authHeader(), paramsSerializer: function (params) {
            return Qs.stringify(params, { arrayFormat: 'repeat', allowDots: true })
        }, responseType: 'blob'
    })
        .then(handleResponse)
        .then(data => {
            const blob = new Blob([data], { type: 'blob' })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = name
            link.click()
            URL.revokeObjectURL(link.href)
        }).catch(catchErrors);
}