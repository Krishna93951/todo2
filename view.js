  var totalTodos = document.getElementById('allTask');
  var countMessage = {
  all: "All Tasks: ",
  completed: " / Number of Completed Tasks: ",
  pending: " / Number of Pending Tasks: "
  };

  function creatingNewElements(input){
  var li=document.createElement("li");
  checkboxElement(li)
  spanElement(li,input)
  deleteButtonElement(li,input)
  appendToList(li)
  }

  function totalMsg(checkedCount,pending){
    return totalTodos.innerHTML =   countMessage.all +taskData.length +" "+countMessage.completed+checkedCount+" "+  countMessage.pending+pending ; 
    }

  function emptyListMsg(){
    return totalTodos.innerHTML =   countMessage.all +'0'+" "+countMessage.completed+'0'+" "+  countMessage.pending+'0' ;
}

  function emptyList(){
    var list=document.getElementById('ul');
    return list.innerHTML=notifyMessage.empty
  }