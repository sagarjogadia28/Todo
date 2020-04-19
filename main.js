/************************* SELECTORS *************************/
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

/************************* EVENT LISTENERS *************************/
todoButton.addEventListener('click', addTodo);

/************************* FUNCTIONS *************************/
function addTodo(event) {
    //Prevent the form from submitting
    event.preventDefault();

    //Create a To-do div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create a li item
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    todoInput.value = "";
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

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