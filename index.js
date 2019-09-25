// Import stylesheets
import './style.css';

// Write Javascript code!
var todos = [];
//Count Messages if tasks are available
var alertMessage = {
  all: "Number of All Tasks:",
  completed: "Number of Completed Tasks:",
  pending: "Number of Pending Tasks: ",
  empty:"No Tasks Available",
  noneCompleted:"None of the Tasks are Completed",
  nonePending:"None of the Tasks are Pending"
};

function init()
{
  showTask();
  eventsHandler();
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

function addTask() 
{
  var task = document.getElementById('todoTask').value;
  var todos = getTodo();
  todos.push(task);
  localStorage.setItem('todo', JSON.stringify(todos));
  showTask();
}

function showTask() 
{ 
  var todos = getTodo();
  var html = '<ul id="ul">';
  for (var i = 0; i < todos.length; i++)
  {
    html += '<li>' + '<input type="checkbox" id="' + i + '" autocomplete="on">' +' '+todos[i] +'  '+'<button class="remove" id="' + i + '">Del</button></li>';
  };
  html += '</ul>';
  document.getElementById('todoList').innerHTML = html;
  eventToRemoveTask();
}

function removeTask() 
{
  var id = this.getAttribute('id');
  var todos = getTodo();
  todos.splice(id, 1);
  localStorage.setItem('todo', JSON.stringify(todos));
  showTask();
}

//function for all tasks
function allTaskCount() 
{
  var todos = getTodo();
  if (todos.length != 0) 
  {
    alert(alertMessage.all + todos.unshift());
  }
  else 
  {
    alert(alertMessage.empty);
  }
}

//function for completed tasks
function completedTaskCount() 
{
  var completed = document.querySelectorAll('input[type="checkbox" ]:checked')
  console.log(Object.values(completed));
  //console.log(Object.entries(completed));
  if (completed.length != 0) 
  {
    alert(alertMessage.completed + ' ' + completed.length);
  }
  else
  {
    alert(alertMessage.noneCompleted);
  }
}

//function for pending tasks
function pendingTaskCount() 
{ 
  var completed = document.querySelectorAll('input[type="checkbox" ]:checked')
  var todos = getTodo();
  var pending = todos.length - completed.length;
  //console.log(pending)
  if(pending != 0)
  {
    alert(alertMessage.pending + ' ' + pending);
  }
  else
  {
    alert(alertMessage.nonePending);
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

function eventToRemoveTask() 
{
  var buttons = document.getElementsByClassName('remove');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', removeTask);
  };
}

function eventsHandler() 
{
  document.getElementById('addBtn').addEventListener('click', event => 
  {
    focusField();
    addTask();
    clearField();
  });

  document.getElementById('all').addEventListener('click', event => 
  {
   allTaskCount();
  });

  document.getElementById('completed').addEventListener('click', event => 
  {
    completedTaskCount();
  });

  document.getElementById('pending').addEventListener('click', event => 
  {
    pendingTaskCount();
  });

}
init();