let inputEle = document.getElementById("todo-task");

function getTasksFromLocalStorage() {
    let data = localStorage.getItem("todoTasks");
    let parsedData = JSON.parse(data);
    return parsedData;
}

let tasks = getTasksFromLocalStorage();

let mainTodosContainer = document.getElementById("main-todos-container");
let tasksCount = tasks.length;
let saveBtn = document.getElementById("save-task");

function saveTask() {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

saveBtn.onclick = function () {
    saveTask();
};

function onClickStatusChange(labelId, checkboxId, taskId) {
    let labelEle = document.getElementById(labelId);
    labelEle.classList.toggle("status-change");

    let checkboxElement = document.getElementById(checkboxId);
    

    let requiredIndex = tasks.findIndex(function (eachTask) {
        let eachTodoId = "task" + eachTask.id;

        if (eachTodoId === taskId) {
            return true;
        } else {
            return false;
        }
    });

    let task = tasks[requiredIndex];

    if (task.isTaskCompleted === true) {
        task.isTaskCompleted = false;
    } else {
        task.isTaskCompleted = true;
    }
}

function deleteTask(taskId) {
    let taskCard = document.getElementById(taskId);
    mainTodosContainer.removeChild(taskCard);
    let requiredIndex = tasks.findIndex(function (eachTask) {
        requiredTaskId = "task" + eachTask.id;
        if (taskId === requiredTaskId) {
            return true;
        } else {
            return false;
        }
    });
    tasks.splice(requiredIndex, 1);
}
/*
function editTask(taskId){
    let requiredIndex = tasks.findIndex(function(eachTask){
        requiredTaskId = "task"+eachTask.id
        if (taskId === requiredTaskId){
            return true;
        }
        else {
            return false;
        }
    })

    inputEle.value = tasks[requiredIndex]['task'];   
}
*/

function createTasks(eachTask) {
    let checkboxId = "checkbox" + eachTask.id;
    let labelId = "label" + eachTask.id;
    let taskId = "task" + eachTask.id;

    let divEle = document.createElement("div");
    divEle.setAttribute("class", "todo-card");
    divEle.id = taskId;

    let inputEle = document.createElement("input");
    inputEle.setAttribute("type", "checkbox");
    inputEle.setAttribute("class", "todo-checkbox");
    inputEle.id = checkboxId;
    inputEle.checked = tasks.isTaskCompleted;  
    inputEle.onclick = function () {
        onClickStatusChange(labelId, checkboxId, taskId);
    };
    divEle.appendChild(inputEle);

    let labelEle = document.createElement("label");
    labelEle.setAttribute("class", "todo-task");
    labelEle.setAttribute("for", checkboxId);
    labelEle.id = labelId;
    labelEle.innerText = eachTask["task"];
    divEle.appendChild(labelEle);

    let featuresDiv = document.createElement("div");
    featuresDiv.setAttribute("class", "to-do-modification-features");
    divEle.appendChild(featuresDiv);
    /*
    let editEle = document.createElement("i");
    editEle.setAttribute("class", "fa-solid fa-pen");
    editEle.onclick = function (){
        editTask(taskId)
    }
    featuresDiv.appendChild(editEle);
    */

    let delEle = document.createElement("i");
    delEle.setAttribute("class", "fa-solid fa-trash");
    featuresDiv.appendChild(delEle);
    delEle.onclick = function () {
        deleteTask(taskId);
    };

    mainTodosContainer.appendChild(divEle);
}

function addTask() {
    // let task = document.getElementById("todo-task");

    if (inputEle.value === "") {
        alert("Please Enter Valid Input!");
    } else {
        let newTask = {
            id: Math.random() * 100,
            task: inputEle.value,
            isTaskCompleted: false,
        };
        tasks.push(newTask);
        createTasks(newTask);
        inputEle.value = "";
    }
}

for (let task of tasks) {
    createTasks(task);
}
