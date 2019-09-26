// Import stylesheets
import './style.css';

// Write Javascript code!
var todos = [];

//Count Messages if tasks are available
var countMessage = {
  all: "Number of All Tasks:",
  completed: "/Number of Completed Tasks:",
  pending: "/Number of Pending Tasks: ",
  empty:"No Tasks Available",
  noneCompleted:"None of the Tasks are Completed",
  nonePending:"None of the Tasks are Pending",
};

var totalTodos = document.getElementById('allTask');

function init()
{
  showTask();
  eventsHandler();
  totalMsg();
  
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
  getTodo();
  todos.push(task);
  localStorage.setItem('todo', JSON.stringify(todos));
  showTask();
  totalMsg()
  
}

function showTask() 
{ 
  getTodo();
  var html = '<ul id="ul">';
  for (var i = 0; i < todos.length; i++)
  { 
    html += '<li id="LI">'+'<input type="checkbox" id="'+ i +'" >'+' '+todos[i] +'  '+'<button class="remove" id="' + i + '">Del</button></li>';
  };
  html += '</ul>';
  document.getElementById('todoList').innerHTML = html;
  eventToRemoveTask();
  totalMsg();

  
}
// function check(){
// let completed = document.querySelectorAll('input[type=checkbox]');
// let countSelected = 0;

// Array.prototype.forEach.call(completed, function(el, i){

//     el.addEventListener('click', function(){

//   countSelected = document.querySelectorAll('input[type=checkbox]:checked').length;
//   });

// });
// }

function removeTask() 
{
  var id = this.getAttribute('id');
  getTodo();
  todos.splice(id, 1);
  localStorage.setItem('todo', JSON.stringify(todos));
  showTask();
  totalMsg()
}

function eventToRemoveTask() 
{
  var buttons = document.getElementsByClassName('remove');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', removeTask);
  };
}

//function for all tasks
function totalMsg(){
  getTodo();
  var completed = document.querySelectorAll('input[type="checkbox" ]:checked')
  console.log(Object.values(completed))
  event.preventDefault();
  const pending = todos.length-completed.length;
  if(todos.length === 1){
    return totalTodos.innerHTML =   countMessage.all +todos.length +" "+countMessage.completed+completed.length+" "+  countMessage.pending+pending ; 
  }
  else{
    return totalTodos.innerHTML = countMessage.all +todos.length +" "+countMessage.completed+completed.length+" "+  countMessage.pending+pending ;
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

function eventsHandler() 
{
  document.getElementById('addBtn').addEventListener('click', event => 
  {
    focusField();
    addTask();
    clearField();
  });
}
init();
