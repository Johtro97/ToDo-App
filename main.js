const input = document.querySelector("#input");
const addBtn = document.querySelector("#btn-add");
const taskList = document.querySelector("#task-list")
const form = document.querySelector("#task-form")
const createForm = document.getElementById("create-form");
let todos = [];

//get all todos from api
function getAllTodos() {
    fetch("https://dummyjson.com/todos?limit=8&skip=0")
      .then((res) => res.json())
      .then((values) => {
        todos = values.todos;
        createTodos(todos);
      });
  }

function createTodos(todos) {
  taskList.innerHTML = "";
  for (let todo of todos) {
    let element = displayTask(todo);
    taskList.append(element);
  }
}

function displayTask(todo) {
  let li = document.createElement("li");
  li.classList.add("todo-item");
  let article = document.createElement("article");

  let description = document.createElement("p");
  let completed = document.createElement("input");
  let removeBtn = document.createElement("button");

  completed.type = "checkbox";
  description.innerText = todo.todo;
  completed.checked = todo.completed;
  removeBtn.innerText = "X";

  //line-through text if task is completed
  if(completed.checked){
    li.style.textDecoration = "line-through"
  }else{
    li.style.textDecoration = "none"
  }

  completed.addEventListener("change", (event) => {
    if(event.target.checked){
      li.style.textDecoration = "line-through"
    }else{
      li.style.textDecoration = "none"
    }
  });

  removeBtn.addEventListener("click", () => {
    removeTodo(todo, todos, () => {
      createTodos(todos);
    });
  });

  article.append(description, completed, removeBtn);

  li.append(article);
  return li;
}

//call function to get all todos from api
getAllTodos();
