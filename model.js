function getTodo() 
{
  var todos_str = sessionStorage.getItem('todo');
  if (todos_str != null) 
  {
    todos = JSON.parse(todos_str);
  }
  return todos;
}


function setTodo(){
  sessionStorage.setItem('todo', JSON.stringify(todos));
}
