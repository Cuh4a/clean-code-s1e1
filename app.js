//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput = document.querySelector(".contaier-add__input");//Add a new task.
var addButton = document.querySelector(".contaier-add__btn");//first button
var incompleteTaskHolder = document.querySelector(".contaier-todo__list");//ul of #incompleteTasks
var completedTasksHolder = document.querySelector(".contaier-comleted__list");//completed-tasks

//New task list item
var createNewTaskElement = function (taskString) {

    var listItem = document.createElement("li");
    listItem.classList.add("list-item")

    //input (checkbox)
    var checkBox = document.createElement("input");//checkbx
    checkBox.classList.add("list-item__checkbox")

    //label
    var label = document.createElement("label");//label
    label.classList.add("list-item__lbl")

    //input (text)
    var editInput = document.createElement("input");//text
    editInput.classList.add("list-item__text")

    //button.edit
    var editButton = document.createElement("button");//edit button
    editButton.classList.add("btn")

    //button.delete
    var deleteButton = document.createElement("button");//delete button
    deleteButton.classList.add("btn")
    var deleteButtonImg = document.createElement("img");//delete button image
    deleteButtonImg.classList.add("list-item__btn-image")
    
    label.innerText = taskString;
    label.className = "list-item__lbl";

    //Each elements, needs appending
    checkBox.type = "checkbox";
    editInput.type = "text";
    editInput.className = "list-item__input input";

    editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
    editButton.className = "edit-btn btn input"; 


    deleteButton.className = "list-del-btn btn";
    deleteButtonImg.src = "./remove.svg";
    deleteButton.appendChild(deleteButtonImg);

    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

var addTask = function () {
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";

}

//Edit an existing task.

var editTask = function () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    var listItem = this.parentNode;

    var editInput = listItem.querySelector(".list-item__text");
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".edit-btn");
    var containsClass = listItem.classList.contains("list-item__mode");
    //If class of the parent is .editmode
    if (containsClass) {
        //switch to .editmode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("list-item__mode");
};


//Delete task.
var deleteTask = function () {
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted = function () {
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete = function () {
    console.log("Incomplete Task...");
    //Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}



var ajaxRequest = function () {
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    //select ListItems children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit-btn");
    var deleteButton = taskListItem.querySelector("button.list-del-btn");


    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}




// Issues with usability don"t get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
alert("Привет!!! Работу немного не успел доделать, доделаю за пару дней и сброшу выполненую работу!")