// Import stylesheets
import './style.css';

// Write Javascript code!
var todos = [];
var todos1 = [];
//Count Messages if tasks are available
var localeString = {
  all: "Number of All Tasks:",
  completed: "Number of Completed Tasks:",
  pending: "Number of Pending Tasks: "
};
////Messages if tasks are unavailable
var emptyString= {
  empty:"No Tasks Available",
  noneCompleted:"None of the Tasks are Completed",
  nonePending:"None of the Tasks are Pending"
};
function init()
{
  showTodo();
  eventHandler();
}
function getTodo() 
{
  var todos_str = localStorage.getItem('todo');
  if (todos_str != null) 
  {
    todos = JSON.parse(todos_str);
  }
  return todos;
}
function addTodo() 
{
  var task = document.getElementById('todoTask').value;
  var todos = getTodo();
  todos.push(task);
  localStorage.setItem('todo', JSON.stringify(todos));
  showTodo();
}
function showTodo() 
{ 
  var todos = getTodo();
  var html = '<ul id="ul">';
  for (var i = 0; i < todos.length; i++)
  {
    html += '<li>' + '<input type="checkbox" id="' + i + '" autocomplete="on">' +' '+todos[i] +'  '+'<button class="remove" id="' + i + '">Del</button></li>';
  };
  html += '</ul>';
  document.getElementById('todoList').innerHTML = html;
  removeBtn();
}
function removeTodo() 
{
  var id = this.getAttribute('id');
  var todos = getTodo();
  todos.splice(id, 1);
  localStorage.setItem('todo', JSON.stringify(todos));
  showTodo();
}
//function for all tasks
function all() 
{
  var todos = getTodo();
  todos1 = todos;
  if (todos1.length != 0) 
  {
    alert(localeString.all + todos1.unshift());
  }
  else 
  {
    alert(emptyString.empty);
  }
}
//function for completed tasks
function checked() 
{
  var completed = document.querySelectorAll('input[type="checkbox" ]:checked')
  console.log(Object.values(completed));
  //console.log(Object.entries(completed));
  if (completed.length != 0) 
  {
    alert(localeString.completed + ' ' + completed.length);
  }
  else
  {
    alert(emptyString.noneCompleted);
  }
}
//function for pending tasks
function pending() 
{ 
  var completed = document.querySelectorAll('input[type="checkbox" ]:checked')
  var todos = getTodo();
  var pending = todos.length - completed.length;
  //console.log(pending)
  if(pending != 0)
  {
    alert(localeString.pending + ' ' + pending);
  }
  else
  {
    alert(emptyString.nonePending);
  }
}
//clearing the text field
function clearField() 
{
  document.getElementById("todoTask").value = "";
}
//focusing on the text field
function focusField() 
{
  document.getElementById("todoTask").focus();
}
function removeBtn() 
{
  var buttons = document.getElementsByClassName('remove');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', removeTodo);
  };
}
function eventHandler() 
{
  document.getElementById('addBtn').addEventListener('click', event => 
  {
    focusField();
    addTodo();
    clearField();
  });
  document.getElementById('all').addEventListener('click', event => 
  {
    all();
  });
  document.getElementById('completed').addEventListener('click', event => 
  {
    checked();
  });
  document.getElementById('pending').addEventListener('click', event => 
  {
    pending();
  });
}
init();