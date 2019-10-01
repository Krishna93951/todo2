var todos = [];
var totalTodos = document.getElementById('allTask');

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
  showTask();
  eventsHandler();
  totalMsg();
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

//function for all tasks

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
}

init();