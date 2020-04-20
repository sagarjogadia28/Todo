/************************* SELECTORS *************************/
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


/************************* EVENT LISTENERS *************************/
document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteAndMarkComplete);
filterOption.addEventListener('change', filterTodo);

/************************* FUNCTIONS *************************/
function addTodo(event) {
    //Prevent the form from submitting
    event.preventDefault();

    //Create a to-do item
    createATodo(todoInput.value, true);

    //Delete the value from the input
    todoInput.value = "";
}

function deleteAndMarkComplete(e) {
    const clickedItem = e.target;

    //Delete the to-do item
    if (clickedItem.classList[0] === 'trash-btn') {
        const parentElement = clickedItem.parentElement;
        parentElement.classList.toggle('fall');
        parentElement.addEventListener('transitionend', () => {
            parentElement.remove();
        });
        removeLocalTodos(parentElement);
    }

    //Mark the item as completed
    if (clickedItem.classList[0] === 'complete-btn') {
        clickedItem.parentElement.classList.toggle('completed');
    }
}

//Filter the to-do list according to completed or not
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'incomplete':
                if (todo.classList.contains('completed'))
                    todo.style.display = 'none';
                else
                    todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed'))
                    todo.style.display = 'flex';
                else
                    todo.style.display = 'none';

                break;
        }
    });
}

//Initialize the to-do array if null or get it from local storage
function getTodoArray() {
    let todoArray;
    if (localStorage.getItem('todos') === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(localStorage.getItem('todos'));
    }
    return todoArray;
}

//Save each to-do to local storage
function saveLocalTodos(todo) {
    let todoArray = getTodoArray();
    todoArray.push(todo);
    localStorage.setItem('todos', JSON.stringify(todoArray));
}

//Get to-do list from local storage when page is reloaded
function getLocalTodos() {
    let todoArray = getTodoArray();
    todoArray.forEach(function (todo) {
        createATodo(todo, false);
    });
}

//Remove to-do item from local storage which clicked on trash button
function removeLocalTodos(todo) {
    let todoArray = getTodoArray();
    const position = todoArray.indexOf(todo.children[0].innerText);
    todoArray.splice(position, 1);
    localStorage.setItem('todos', JSON.stringify(todoArray));
}

//Create a to-do item with parameter: value to set and whether to save to local storage
function createATodo(value, saveToLocal) {
    //Create a To-do div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //If nothing entered by user then return
    if (value === '')
        return;

    //Create a li item
    const newTodo = document.createElement('li');
    newTodo.innerText = value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Add to-do to local storage
    if (saveToLocal)
        saveLocalTodos(todoInput.value);

    //Create check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //Create trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //Add div to lists
    todoList.appendChild(todoDiv);
}