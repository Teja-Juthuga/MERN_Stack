let tasks = [
    {
        id: 1,
        task: "Learn Javascript",
    },
    {
        id: 2,
        task: "Learn React",
    },
    {
        id: 3,
        task: "Learn Sql",
    },
];

let mainTodosContainer = document.getElementById("main-todos-container");

function createTasks(eachTask) {
    let divEle = document.createElement("div");
    divEle.setAttribute("class", "todo-card");

    let inputEle = document.createElement("input");
    inputEle.setAttribute("type", "checkbox");
    inputEle.setAttribute("class", "todo-checkbox");
    divEle.appendChild(inputEle);

    let pEle = document.createElement("p");
    pEle.setAttribute("class", "todo-task");
    pEle.innerText = eachTask["task"];
    divEle.appendChild(pEle);

    let featuresDiv = document.createElement("div");
    featuresDiv.setAttribute("class", "to-do-modification-features");
    divEle.appendChild(featuresDiv);

    let editEle = document.createElement("i");
    editEle.setAttribute("class", "fa-solid fa-pen");
    featuresDiv.appendChild(editEle);

    let delEle = document.createElement("i");
    delEle.setAttribute("class", "fa-solid fa-trash");
    featuresDiv.appendChild(delEle);

    mainTodosContainer.appendChild(divEle);
}

function addTask(){
    let task = document.getElementById("todo-task");
    console.log(task.value);    
}

for (let task of tasks) {
    createTasks(task)
}
