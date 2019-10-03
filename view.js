function totalMsgL(checkedboxs,pending){
    return totalTodos.innerHTML =   countMessage.all +todos.length +" "+countMessage.completed+checkedboxs.length+" "+  countMessage.pending+pending ; 
}

function showTaskOfLocal() 
{ 
  getTodoFromLocal();
  var html = '<ul id="ul">';
    for (var i = 0; i < todos.length; i++)
    { 
      html += '<li id="LI">'+'<input type=checkbox value="1" id ="'+ i +'" class="checkbox">'+'  '+'<lable class="strikeThis">'+todos[i] +'</label>'+'  '+'<button class="remove" id="' + i + '">Del</button></li>';
    };
    html += '</ul>';
    document.getElementById('todoList').innerHTML = html;
    eventsOfLocalStorage(); 
}

function showTaskOfSession() 
{ 
  getTodoFromSession();
  var html = '<ul id="ul">';
    for (var i = 0; i < todoSession.length; i++)
    { 
      html += '<li id="LI">'+'<input type=checkbox value="1" id ="'+ i +'" class="checkbox">'+'  '+'<lable class="strikeThis">'+todoSession[i] +'</label>'+'  '+'<button class="remove" id="' + i + '">Del</button></li>';
    };
    html += '</ul>';
    document.getElementById("todoList").innerHTML = html;
    eventsOfSessionStorage(); 
}

function totalMsgS(checkedboxs,pending){
  return totalTodos.innerHTML =   countMessage.all +todoSession.length +" "+countMessage.completed+checkedboxs.length+" "+  countMessage.pending+pending ; 
}