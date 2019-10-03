//Local Storage
function getTodoFromLocal() 
{
  var todos_str = localStorage.getItem('todo');
  if (todos_str != null) 
  {
    todos = JSON.parse(todos_str);
  }
  return todos;
}


function setTodoToLocal(){
  localStorage.setItem('todo', JSON.stringify(todos));
}

//Seesion Storage
function getTodoFromSession() 
{
  var todos_strSession = sessionStorage.getItem('todosession');
  if (todos_strSession != null) 
  {
     todoSession= JSON.parse(todos_strSession);
  }
  return todoSession ;
}

function setTodoToSession(){
  sessionStorage.setItem('todosession', JSON.stringify(todoSession));
}
