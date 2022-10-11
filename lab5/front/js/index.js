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

async function getAllCars() {
    const rawRes = await baseRequest({ url: "list", method: "GET" });
    return rawRes.json();

}

async function postCar(body) {
    return await baseRequest({ url: "item", method: "POST", body: (body)})
}

const submitButton = document.getElementById("submit_button");
const findButton = document.getElementById("find_button");
const cancelButton = document.getElementById("cancel_button");
const sortByPowerButton = document.getElementById("sort_by_power");
const sortByMaxSpeedButton = document.getElementById("sort_by_max_speed");
const totalAmmount = document.getElementById("ammount");

const findIn = document.getElementById("find");
const markIn = document.getElementById("mark");
const powerIn = document.getElementById("power");
const maxSpeedIn = document.getElementById("max_speed");

const carsList = document.getElementById("cars_list");
const carsAmmount = document.getElementById("cars");

let cars = [];

window.addEventListener("load", () => {
    refetchAllCars();

});


function getInputValues() {

    let mark = markIn.value;
    let power = powerIn.value;
    let speed = maxSpeedIn.value;

    if (mark == "" || mark[0] == " " || power == "" || speed == "") {
        alert("Please enter all data!");
        return null;
    }
    else return {
        mark,
        power,
        speed
    };

};

function clearInputs() {
    markIn.value = "";
    powerIn.value = "";
    maxSpeedIn.value = "";
};


function carTemplate({ id, mark, power, speed }) {
    return (
        `<li id="${id}">
    <div>
        <img src="https://t3.ftcdn.net/jpg/01/92/21/40/360_F_192214085_QnQ58x0ZKRLSUEgarcjVHNWrnmH8uWTA.jpg"
            alt="">
        <div id="car_body">
            <h4>${mark}</h4>
            <p>
            ${power} H.P <br>
            ${speed} Km/H
            </p>
        </div>
    </div>
</li>`)
};

function ammountTemplate(ammount) {
    return (`<p>Total Ammount: ${ammount}</p>`)
};


async function addCar({ mark, power, speed }) {
    const id = (uuid.v1()).toString();
    console.log(id);
    postCar({ id, mark, power, speed }).then(refetchAllCars);
    addItemToPage({ id, mark, power, speed });

};

function addItemToPage({ id, mark, power, speed }) {
    carsList.insertAdjacentHTML("afterbegin", carTemplate({ id, mark, power, speed }));


    document.getElementById(id).addEventListener("click", () => {
        let obj = { id, mark, power, speed };
        window.sessionStorage.setItem('myId', JSON.stringify(obj));
        window.location.replace("./edit.html");

    });


};

function drawCars(cars) {
    carsList.innerHTML = "";

    for (let car of cars) {
        addItemToPage(car);
    }
};

async function refetchAllCars(){
    const allCars = await getAllCars();
    if(allCars){
        cars = allCars;
    }
    drawCars(cars);

}


submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const car = getInputValues();
    if (car === null) return;

    clearInputs();
    addCar(car);

});


findButton.addEventListener("click", (event) => {
    event.preventDefault();

    const searchedCars = cars.filter(car => car.mark.search(findIn.value) !== -1);
    findIn.value = "";
    drawCars(searchedCars);

});

cancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    findIn.value = "";
    drawCars(cars);

});

sortByMaxSpeedButton.addEventListener("click", (event) => {
    event.preventDefault();
    const sortedCars = cars.sort((a, b) => { return a.speed - b.speed });
    drawCars(sortedCars);
});

sortByPowerButton.addEventListener("click", (event) => {
    event.preventDefault();
    const sortedCars = cars.sort((a, b) => { return a.power - b.power });
    drawCars(sortedCars);
});

totalAmmount.addEventListener("click", (event) => {
    event.preventDefault();
    carsAmmount.innerHTML = "";
    carsAmmount.insertAdjacentHTML("afterbegin", ammountTemplate(cars.length));
});


refetchAllCars();