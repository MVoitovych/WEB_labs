const BASE_URL = 'http://localhost:8080/main/car';
const RES_URL = BASE_URL + 'item';

const baseRequest = async ({ url = "", method = "GET", body = null }) => {

    try {
        const reqParams = {
            method,
            headers: { "Content-Type": "application/json" },
        };

        if (body) {
            reqParams.body = JSON.stringify(body);
        }


        return await fetch(BASE_URL + "/" + url, reqParams);
    } catch (error) {
        console.log(error);
    }
}

async function putCar(body) {
    return await baseRequest({ url: "item", method: "PUT", body: (body) })
}

async function deleteCar(id) {
    return await baseRequest({ url: "item/" + id, method: "DELETE", body: null })
}


const newMark = document.getElementById("new_mark");
const newPower = document.getElementById("new_power");
const newSpeed = document.getElementById("new_max_speed");

const editButton = document.getElementById("edit");
const deleteButton = document.getElementById("delete");

currentObj = JSON.parse(window.sessionStorage.getItem('myId'));

newMark.value = currentObj.mark;
newPower.value = currentObj.power;
newSpeed.value = currentObj.speed;


async function editCar({ id, mark, power, speed }) {
    await putCar({ id, mark, power, speed });
    window.location.replace("./index.html");
}

async function delCar(id){
    await deleteCar(id); 
    window.location.replace("./index.html");
}


editButton.addEventListener("click", (event) => {
    event.preventDefault();

    const mark = newMark.value;
    const power = newPower.value;
    const speed = newSpeed.value;
    const id = currentObj.id;
    console.log(currentObj);

    editCar({ id, mark, power, speed });
});

deleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    const id = currentObj.id;
    delCar(id);

});



