  var totalTodos = document.getElementById('allTask');
  var countMessage = {
  all: "All Tasks: ",
  completed: " / Number of Completed Tasks: ",
  pending: " / Number of Pending Tasks: "
  };

  function display(i){
  var li;
  var span;
  var checkBox;
  var item;
  var deletebutton;
  li=document.createElement("li");
  checkBox = document.createElement('INPUT');
  checkBox.setAttribute('type','checkbox');
  checkBox.setAttribute('class','checkbox');
  li.appendChild(checkBox);
  span = document.createElement("SPAN");
  item = document.createTextNode(i)
  span.appendChild(item);
  li.appendChild(span);
  deletebutton = document.createElement('BUTTON')
  deletebutton.innerHTML = "Del"
  deletebutton.setAttribute('class','remove')
  deletebutton.setAttribute('id',i)
  li.appendChild(deletebutton);
  attachingEventHandlers();
  append(li)
  }

  function totalMsg(checkedboxs,pending){
  return totalTodos.innerHTML =   countMessage.all +taskData.length +" "+countMessage.completed+checkedboxs.length+" "+  countMessage.pending+pending ; 
  }

