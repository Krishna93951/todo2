function showTask() 
{ 
  getTodo();
  var html = '<ul id="ul">';
  for (var i = 0; i < todos.length; i++)
  { 
    html += '<li id="LI">'+'<input type="checkbox" id="'+ i +'" name="check">'+' '+todos[i] +'  '+'<button class="remove" id="' + i + '">Del</button></li>';
  };
  html += '</ul>';
  document.getElementById('todoList').innerHTML = html;
  eventToRemoveTask();
  eventsHandler();
  totalMsg();
}

function totalMsg(){
  getTodo();
  var completed = document.querySelectorAll('input[type="checkbox" ]:checked')
  console.log(Object.values(completed))
  var pending = todos.length-completed.length;
  if(todos.length === 1){
    return totalTodos.innerHTML =   countMessage.all +todos.length +" "+countMessage.completed+completed.length+" "+  countMessage.pending+pending ; 
  }
  else{
    return totalTodos.innerHTML = countMessage.all +todos.length +" "+countMessage.completed+completed.length+" "+  countMessage.pending+pending ;
    }
}