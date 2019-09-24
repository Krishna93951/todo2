// Import stylesheets
import './style.css';

// Write Javascript code!
var todos = [];
var todos1 = [];
var localeString = {
  all: "Number of All Tasks:",
  completed: "Number of Completed Tasks:",
  pending: "Number of Pending Tasks: "
};
var empty={
  all:"No Tasks Available",
  completed:"No"
}
function init(){
  showTodo();
  eventHandler();
}
function getTodo() {
  var todos_str = localStorage.getItem('todo');
  if (todos_str != null) {
    todos = JSON.parse(todos_str);
  }
  return todos;
}
function addTodo() {
  var task = document.getElementById('todoTask').value;
  var todos = getTodo();
  todos.push(task);
  localStorage.setItem('todo', JSON.stringify(todos));
  console.log(task);
  showTodo();


}
function showTodo() {
  var todos = getTodo();
  var html = '<ul>';
  for (var i = 0; i < todos.length; i++) {
    html += '<li>' + '<input type="checkbox" id="' + i + '">' + todos[i] + '<button class="remove" id="' + i + '">Del</button></li>';
  };
  html += '</ul>';
  document.getElementById('todoList').innerHTML = html;
  removeBtn();
}
function removeTodo() {
  var id = this.getAttribute('id');
  var todos = getTodo();
  todos.splice(id, 1);
  localStorage.setItem('todo', JSON.stringify(todos));
  showTodo();
}
function all() {
  var todos = getTodo();
  todos1 = todos;
  if (todos1.length != 0) {
    alert(localeString.all + todos1.unshift());
  }
  else {
    alert("No Tasks available");
  }
  console.log(todos1);
}
function checked() {
  var completed = document.querySelectorAll('input[type="checkbox"]:checked')
  //console.log(Object.keys(comp));
  //console.log(Object.entries(comp));

  if (completed.length != 0) {
    alert(localeString.completed + ' ' + completed.length)
  }
  else {
    alert("None are completed")
  }
}
function pending() {
  var completed = document.querySelectorAll('input[type="checkbox"]:checked')
  var todos = getTodo();
  todos1 = todos;
  var pending = todos1.length - completed.length;
  alert(localeString.pending + ' ' + pending);
}
function clearField() {
  document.getElementById("todoTask").value = "";
}
function focusField() {
  document.getElementById("todoTask").focus();
}
function removeBtn() {
  var buttons = document.getElementsByClassName('remove');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', removeTodo);
  };
}
function eventHandler() {
  document.getElementById('addBtn').addEventListener('click', event => {
    focusField();
    addTodo();
    clearField();
  });
  document.getElementById('all').addEventListener('click', event => {

    all();


  });
  document.getElementById('completed').addEventListener('click', event => {

    checked();


  });
  document.getElementById('pending').addEventListener('click', event => {

    pending();


  });
}
init();