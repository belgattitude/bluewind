export interface HttpFetchResponse<T> extends Response {
    parsedBody?: T;
}

export const httpFetch = <T>(request: RequestInfo): Promise<HttpFetchResponse<T>> => {
    return new Promise((resolve, reject) => {
        let response: HttpFetchResponse<T>;
        fetch(request)
            .then(res => {
                response = res;
                return res.json();
            })
            .then(body => {
                if (response.ok) {
                    response.parsedBody = body;
                    resolve(response);
                } else {
                    reject(response);
                }
            })
            .catch(err => {
                reject(err);
            });
    });
};
