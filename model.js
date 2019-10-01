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
  todos.push(task);
  localStorage.setItem('todo', JSON.stringify(todos));
  showTask();
  totalMsg()
  focusField();
  clearField();
}