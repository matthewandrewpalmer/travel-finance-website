function requestPromiseJson(method, url, body = null) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            "method": method,
            "body": body
        })
            .then(response => {
                console.log(response);
                resolve(response.json());
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

function requestPromisePOSTJson(url, body) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            "method": 'POST',
            "body": body != null && JSON.stringify(body)
        })
            .then(response => {
                console.log(response);
                resolve(response.json());
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

function requestPromise(method, url, body = null) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            "method": method,
            "body": body
        })
            .then(response => {
                console.log(response);
                resolve(response);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}


export {requestPromiseJson, requestPromisePOSTJson, requestPromise};