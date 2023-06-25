const input = document.querySelector("#input");
const addBtn = document.querySelector("#btn-add");
const taskList = document.querySelector("#task-list")
const form = document.querySelector("#task-form")
const createForm = document.getElementById("create-form");
let todos = []; 
let idCounter = 9

//add users input to task list
form.addEventListener("submit", (event) => {
    if (input.value === ''){
      alert("Write someting first!");
      event.preventDefault();
  }else {
    event.preventDefault();
    let description = form.children[0];
    displayTodo(description.value, todos);
    description.value = "";
  }});

//get all todos from api
function fetchTodos() {
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
  let article = document.createElement("article");
  article.setAttribute("id", "article")

  let description = document.createElement("p");
  let completed = document.createElement("input");
  let removeBtn = document.createElement("button");


  completed.type = "checkbox";
  description.innerText = todo.todo;
  completed.checked = todo.completed;
  removeBtn.innerText = "X";

  //line-through text if task is completed  
  if(completed.checked){
    description.style.textDecoration = "line-through" 
  }else{
    description.style.textDecoration = "none"
  }

  //if user click on checkbock
  completed.addEventListener("change", (event) => {
    if(event.target.checked){
        description.style.textDecoration = "line-through"
    }else{
      description.style.textDecoration = "none"
    }
  });

  //if user click on removeBtn
  removeBtn.addEventListener("click", () => {
    removeTodo(todo, todos)//call function to remove the task
    }); 

  article.append(completed, description, removeBtn);

  li.append(article);
  return li;
}


//add new todo
function displayTodo(description, todos) {
    fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: description,
        completed: false,
        userId: 1,
      }),
    })
      .then((res) => res.json())
      .then((value) => {
        value.id = idCounter++; //add id to todo
        todos.push(value); //add new todo to array
        createTodos(todos); //update task list
      });
  }

 //delete a todo from tasklist
function removeTodo(todo, todos) {
    fetch("https://dummyjson.com/todos/" + todo.id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((value) => {
        if (value.isDeleted) {
          let index = todos.findIndex((todo) => todo.id === value.id);
          if (index !== -1) {
            todos.splice(index, 1); //remove task from array
          }
          createTodos(todos); //update task list
        }
      });
  }

//call function to get all todos from api
fetchTodos();
