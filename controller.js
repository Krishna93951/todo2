var todos = [];
var totalTodos = document.getElementById('allTask');
var task = document.getElementById('todoTask').value;
//Count Messages if tasks are available
var countMessage = {
  all: "Number of All Tasks:",
  completed: "/Number of Completed Tasks:",
  pending: "/Number of Pending Tasks: ",
  empty:"No Tasks Available",
  noneCompleted:"None of the Tasks are Completed",
  nonePending:"None of the Tasks are Pending",
};

function init()
{
  eventsHandler();
}

function removeTask() 
{
  var id = this.getAttribute('id');
  getTodo();
  todos.splice(id, 1);
  setTodo();
  render();
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
  document.getElementById('addBtn').addEventListener('click',addTask);
  var buttons = document.getElementsByClassName('remove');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', removeTask);
  };
}

function addTask() 
{  
  todos.push(document.getElementById('todoTask').value);
  setTodo();
  render(); 
}

function render(){
  showTask();
  focusField();
  clearField();
}

init();