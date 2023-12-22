let title = document.getElementById('title');
let time = document.getElementById('time');
let addBtn = document.getElementById('addBtn');
let grid = document.getElementById('grid');
let deleteAllBtn = document.getElementById('deleteAllBtn');


// GET
const fetchTodos = () => {
    grid.innerHTML = `
            <div class="row text-bg-primary">
                <div class="col-2 col-sm-1 p-2 border-light border-end">
                    S.No
                </div>
                <div class="col-5 col-sm-7 p-2 border-light border-end">
                    Title
                </div>
                <div class="col-2 p-2 border-light border-end">
                    Time
                </div>
                <div class="col-3 col-sm-2 p-2">
                    Action
                </div>
            </div>
    `
    if (localStorage.getItem('todos') !== null) {
        let todosStr = localStorage.getItem('todos');
        let todos = JSON.parse(todosStr);
        todos.forEach((todo, index) => {
            grid.innerHTML += `
            <div class="row">
                <div class="col-2 col-sm-1 p-2 border-light border-end">
                    ${index + 1}
                </div>
                <div class="col-5 col-sm-7 p-2 border-light border-end">
                    ${todo.title}
                </div>
                <div class="col-2 p-2 border-light border-end">
                    ${todo.time}
                </div>
                <div class="col-3 col-sm-2 p-2">
                    <button class="btn btn-sm btn-danger" onclick="deleteTodo(${index})">Delete</button>
                </div>
            </div>
            `
        });
    }
}
fetchTodos();

// POST
const addTodo = () => {
    const newTodo = {
        title: title.value,
        time: time.value
    };
    if (localStorage.getItem('todos') === null) {
        let todos = [];
        todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todos));
    } else {
        let todosStr = localStorage.getItem('todos');
        let todos = JSON.parse(todosStr);
        todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    fetchTodos();
}

const deleteAllTodos = () => {
    let a = confirm("Are you sure you want to delete all TODOs!");
    if (a) {
        localStorage.clear('todos');
    }
    fetchTodos();
}

const deleteTodo = (index) => {
    let todosStr = localStorage.getItem('todos');
    let todos = JSON.parse(todosStr);
    const newArr1 = todos.slice(0, index);
    const newArr2 = todos.slice(index+1);
    todos = newArr1.concat(newArr2);
    localStorage.setItem('todos', JSON.stringify(todos));
    fetchTodos();
}

addBtn.addEventListener('click', addTodo);
deleteAllBtn.addEventListener('click', deleteAllTodos);