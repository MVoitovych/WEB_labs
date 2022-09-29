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
const editDiv = document.getElementById("edit_div");

let cars = [];

function getInputValues() {

    let mark = markIn.value;
    let power = powerIn.value;
    let speed = maxSpeedIn.value;

    if (mark == "" || power == "" || speed == "") {
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


function addItemToPage({ id, mark, power, speed }) {
    carsList.insertAdjacentHTML("afterbegin", carTemplate({ id, mark, power, speed }));
    document.getElementById(id).addEventListener("click", (event) => {
        event.preventDefault();
        showEdit(id);
    });
};

function addCar({ mark, power, speed }) {
    const gID = uuid.v1();
    const car = { gID, mark, power, speed };
    cars.push(car);
    addItemToPage(car);

};


function drawCars(cars) {
    carsList.innerHTML = "";

    for (let car of cars) {
        addItemToPage(car);
    }
};


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


function editCar(id) {

    const mark = document.getElementById("new_mark").value;
    const power = document.getElementById("new_power").value;
    const speed = document.getElementById("new_max_speed").value;

    let index = 0;
    while (cars[index].id != id) {
        index++;
    }
    cars[index] = { id, mark, power, speed };
    drawCars(cars);

}

function deleteCar(id) {
    let index = 0;
    while (cars[index].id != id) {
        index++;
    }
    cars.splice(index, 1);
    drawCars(cars);
}



function showEdit(id) {
    editDiv.innerHTML = "";
    editDiv.insertAdjacentHTML("afterbegin",
        `<div>
        <h4>New Mark</h4>
        <input type="text" id="new_mark">
    </div>
    <div>
        <h4>New Engine power</h4>
        <input type="number" id="new_power">
    </div>
    <div>
        <h4>new MAX speed</h4>
        <input type="number" id="new_max_speed">
    </div>
    <button id="edit" type="button">Edit</button>
    <button id="delete" type="button">Delete</button>`);

    editButton = document.getElementById("edit");
    deleteButton = document.getElementById("delete");

    editButton.addEventListener("click", (event) => {
        event.preventDefault();
        editCar(id);
        editDiv.innerHTML = "";

    });

    deleteButton.addEventListener("click", (event) => {
        event.preventDefault();
        deleteCar(id);
        editDiv.innerHTML = "";

    });

}



