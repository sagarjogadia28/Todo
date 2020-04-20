/************************* SELECTORS *************************/
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


/************************* EVENT LISTENERS *************************/
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

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

    //Delete the value from the input
    todoInput.value = "";
}

function deleteCheck(e) {
    const clickedItem = e.target;

    //Delete the to-do item
    if (clickedItem.classList[0] === 'trash-btn') {
        const parentElement = clickedItem.parentElement;
        parentElement.classList.toggle('fall');
        parentElement.addEventListener('transitionend', () => {
            parentElement.remove();
        });

    }

    //Check the item
    if (clickedItem.classList[0] === 'complete-btn') {
        clickedItem.parentElement.classList.toggle('completed');
    }

}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'incomplete':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'none';
                } else {
                    todo.style.display = 'flex';
                }
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}