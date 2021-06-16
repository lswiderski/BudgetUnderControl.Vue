import store from "../store"


export function handleResponse(response) {
    if (response.status !== 200 && response.status !== 204 && response.status !== 201) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
            location.reload(true);
        }

        const error = (response && response.message) || response.statusText;

        return Promise.reject(error);
    }
    return response.data;
}

export function mapServerSideErrors(errorPayload) {
    if (errorPayload.errorType === "Validation") {
        return Object.assign(
            {},
            ...errorPayload.errors.map((x) => ({ [x.propertyName.toLowerCase()]: x.errorMessage }))
        );
    }
    return errorPayload
}

export function mapJSONSerializerErrors(errorPayload) {
    let errors = [];
    Object.getOwnPropertyNames(errorPayload.errors).forEach(function (val) {
        const propertyName = val.replace('$.', '').toLowerCase();
        errors[propertyName] = errorPayload.errors[val].join("; ")
    });
    return errors;
}

export function catchErrors(e) {
    if (e.response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);

    }
    if (e.response.status === 400) {
        let errorPayload = e.response.data;

        if (errorPayload.title) {
            store.dispatch('alert/error', errorPayload.title, { root: true });
            return Promise.reject(mapJSONSerializerErrors(errorPayload));
        } else if (errorPayload.errorType === "Validation") {
            return Promise.reject(mapServerSideErrors(errorPayload));
        } else {
            store.dispatch('alert/error', "error", { root: true });
        }
        return Promise.reject(errorPayload);
    }
    const error = (e && e.message) || e.statusText;
    return Promise.reject(error);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('jwt-token');
    localStorage.removeItem('user');
}