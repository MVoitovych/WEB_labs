const BASE_URL = 'localhost:8080/main/car/';
const RES_URL = BASE_URL + 'item';

async function baseRequest({method="GET", body = {}, headers = {}}){
    try{
        let params = {
            method:method
        }
        if (body){
            params.body = JSON.stringify(body);
        }
        if (headers){
            params.headers = headers;
        }
        return (await fetch(RES_URL, params));
    }
    catch(error){
        console.log(error);
    }
}

export async function getRequest(){
    return (await baseRequest({method: "GET", body: null, headers: null})).json();
}

export async function postRequest(body){
    return (await baseRequest({method: "POST", body: body, headers: {"Content-Type": "application/json"}})).json();
}

export async function putRequest(body){
    return (await baseRequest({method: "PUT", body: body, headers: {"Content-Type": "application/json"}})).json();
}

export async function deleteRequest(id){
    return (await baseRequest({method: "DELETE", body:{id: id}, headers: {"Content-Type": "application/json"}}));
}