function getTasksFromLocalStorage(){
    let data = localStorage.getItem("todoTasks");
    let parsedData = JSON.parse(data);
    return parsedData;
}

let tasks = getTasksFromLocalStorage();

let mainTodosContainer = document.getElementById("main-todos-container");
let tasksCount = tasks.length;
let saveBtn = document.getElementById("save-task");

function saveTask(){
    localStorage.setItem("todoTasks" , JSON.stringify(tasks));
    console.log("saved!");
}

saveBtn.onclick = function(){
    saveTask()
}

function onClickStatusChange(labelId, checkboxId){
    let labelEle =  document.getElementById(labelId);
    labelEle.classList.toggle("status-change")
}

function deleteTask(taskId){
    let taskCard = document.getElementById(taskId);
    mainTodosContainer.removeChild(taskCard);
    let requiredIndex = tasks.findIndex(function(eachTask){
        requiredTaskId = "task"+eachTask.id
        if (taskId === requiredTaskId){
            return true;
        }
        else{
            return false;
        }
    })
    tasks.splice(requiredIndex,1);

}

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
    inputEle.onclick = function() {
        onClickStatusChange(labelId,checkboxId)
    }
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

    let editEle = document.createElement("i");
    editEle.setAttribute("class", "fa-solid fa-pen");
    featuresDiv.appendChild(editEle);

    let delEle = document.createElement("i");
    delEle.setAttribute("class", "fa-solid fa-trash");
    featuresDiv.appendChild(delEle);
    delEle.onclick = function(){
        deleteTask(taskId);
    }


    mainTodosContainer.appendChild(divEle);
}

function addTask(){
    let task = document.getElementById("todo-task");
    
    if (task.value === ""){
        alert("Please Enter Valid Input!");
    }
    else {
        let newTask = {
            id: tasksCount + 1,
            task: task.value,
            isTaskCompleted : false
        }
        tasks.push(newTask);
        createTasks(newTask)
        task.value = ""
    }
}

for (let task of tasks) {
    createTasks(task)
}
