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

var completed = document.querySelectorAll('input[type="checkbox" ]:checked')
// console.log(completed.length);
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
    html += '<li>' + '<input type="checkbox" id="' + i + '" class="check">' +' '+todos[i] +'  '+'<button class="remove" id="' + i + '">Del</button></li>';
  };
  html += '</ul>';
  document.getElementById('todoList').innerHTML = html;
  eventToRemoveTask();
  eventToCheck()
}
function checked(){
var toggle = document.get
}
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

function eventToCheck(){
  var check=document.getElementsByClassName('check');
  for(var i=0; i<check.length; i++){
    check[i].addEventListener('click',checked);
    console.log(check);
  };
}

//function for all tasks
function totalMsg(){
  getTodo();
  const pending = todos.length-completed.length;
  if(todos.length === 1){
    return totalTodos.innerHTML = '<b>' + todos.length + '</b> thing to do / <b>' + completed.length + '</b> completed'+'</b> / Pending<b>'+pending;
  }
  else{
    return totalTodos.innerHTML = '<b>' + todos.length + '</b> things to do / <b>' + completed.length + '</b> completed'+'</b>  /Pending <b>'+pending;
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
