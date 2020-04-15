function getRequestJSON(method, url, body = null) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            "method": method,
            "body": body
        })
            .then(response => {
                resolve(response.json());
            })
            .catch(err => {
                console.error(err);
                reject(err);
            });
    });
}

function postRequestJSON(url, body) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            "method": "POST",
            "body": body != null && JSON.stringify(body)
        })
            .then(response => {
                resolve(response.json());
            })
            .catch(err => {
                console.error(err);
                reject(err);
            });
    });
}

function getRequest(method, url, body = null) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            "method": method,
            "body": body
        })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                console.error(err);
                reject(err);
            });
    });
}


export {getRequestJSON, postRequestJSON, getRequest};