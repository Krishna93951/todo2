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
  append(li)
  }

  function totalMsg(checkedboxs,pending){
    return totalTodos.innerHTML =   countMessage.all +taskData.length +" "+countMessage.completed+checkedboxs.length+" "+  countMessage.pending+pending ; 
    }

  function emptyList(){
    var list=document.getElementById('ul');
    return list.innerHTML = alertMsg.empty;
}
