var todos = [];
var todoSession = [];
var totalTodos = document.getElementById('allTask');
var task = document.getElementById('todoTask');
var checkbox= document.getElementsByClassName("checkbox");
var buttons = document.getElementsByClassName('remove');
var addBtn= document.getElementById('addBtn');
var addBtnSession= document.getElementById('addBtn');
var checkboxValues = [];
var checkbox= document.getElementsByClassName("checkbox");
var storage= document.getElementById('store');
var taskList = document.getElementById("todoList");


//Count Messages if tasks are available
var countMessage = {
  all: "All Tasks:",
  completed: "/Number of Completed Tasks:",
  pending: "/Number of Pending Tasks: ",
  empty:"No Tasks Available",
  noneCompleted:"None of the Tasks are Completed",
  nonePending:"None of the Tasks are Pending",
};

function init()
{ 
  taskList.innerHTML="PLEASE CHOOSE TYPE OF STORAGE";
  storage.addEventListener("change",toChooseStorageAPI);
}

function addTaskToLocalStorage() 
{ 
  if(task.value == ""){
    alert("Please enter valid Task");
  }
  else{
  todos.push(task.value);
  setTodoToLocal();
  renderLocal();
  }
}

function addTaskToSessionStorage() 
{ 
  if(task.value == ""){
    alert("Please enter valid Task");
  }
  else{
  todoSession.push(task.value);
  setTodoToSession();
  renderSession();
  } 
}


function removeTaskFromLocalStorage() 
{ 
  if(task.value == "") {
  var id = this.getAttribute('id');
  todos.splice(id, 1);
  setTodoToLocal();
  renderLocal();
  }
}

function removeTaskFromSessionStorage() 
{ 
  if(task.value == "") {
  var id = this.getAttribute('id');
  todoSession.splice(id, 1);
  setTodoToSession();
  renderSession();
  }
}

//clearing the text field
function clearField() 
{
  task.value = "";
}

//focusing on the text field
function focusField() 
{
  task.focus();
}

function eventsOfLocalStorage() 
{
  addBtn.addEventListener('click',addTaskToLocalStorage);
  addBtn.addEventListener('click',checkedboxCountOfLocalTodo);
  for (var i = 0; i < buttons.length; i++) {
    checkbox[i].addEventListener("click",checkedboxCountOfLocalTodo);
    buttons[i].addEventListener('click',removeTaskFromLocalStorage);
    buttons[i].addEventListener('click',checkedboxCountOfLocalTodo);
  };
}

function eventsOfSessionStorage() 
{
  addBtnSession.addEventListener('click',addTaskToSessionStorage);
  addBtnSession.addEventListener('click',checkedboxCountOfSessionTodo);
  for (var i = 0; i < buttons.length; i++) {
    checkbox[i].addEventListener("click",checkedboxCountOfSessionTodo);
    buttons[i].addEventListener('click',removeTaskFromSessionStorage);
    buttons[i].addEventListener('click',checkedboxCountOfSessionTodo);
  };
}

function checkedboxCountOfLocalTodo(){
  var checkboxValues = [];
  var checkbox= document.getElementsByClassName("checkbox");
  for(var i = 0; i < checkbox.length; i++) {
    checkboxValues.push(checkbox[i].checked ? checkbox[i].checked = true:checkbox[i].checked = false);
        } var checkedboxs = checkboxValues.filter(function (e){
          return e == true;
        })
        var pending = todos.length - checkedboxs.length
        totalMsgL(checkedboxs,pending);    
}

function checkedboxCountOfSessionTodo(){
  var checkboxValues = [];
  var checkbox= document.getElementsByClassName("checkbox");
  for(var i = 0; i < checkbox.length; i++) {
    checkboxValues.push(checkbox[i].checked ? checkbox[i].checked = true:checkbox[i].checked = false);
        } var checkedboxs = checkboxValues.filter(function (e){
          return e == true;
        })
        var pending = todoSession.length - checkedboxs.length
        totalMsgS(checkedboxs,pending);    
}

function renderLocal(){
  showTaskOfLocal();
  focusField();
  clearField();
}

function renderSession(){
  showTaskOfSession();
  focusField();
  clearField();
}

function toChooseStorageAPI(){
  if(storage.value == "LOCAL"){
    getTodoFromLocal();
    renderLocal();
    
  }
  else {
     getTodoFromSession();
     renderSession();
  }  
}

init();