var storageManagerInstance;
var taskData;
var alertMsg = {
    input:"Enter Valid Input",
    empty:"----------------------------List is Empty---------------------------",
    totalMsg: function (){
        var defaultOption = 'Select the Storage type';
        var selectedOption=document.getElementById("storage").value
        if(selectedOption === defaultOption){
            return totalTodos.innerHTML =   countMessage.all +'0'+" "+countMessage.completed+'0'+" "+  countMessage.pending+'0' ;
        }
    }
}

function init(){
    attachingEventHandlers();
    emptyList();
}

function clearAndFocusInputField(){
    var todo =document.getElementById('input');
    todo.value="";
    todo.focus();
}

function attachingEventHandlers(){
    var addBtn = document.getElementById('addBtn');
    var todo =document.getElementById('input');
    addBtn.addEventListener("click",addTaskUsingMouse);
    todo.addEventListener("keypress",addTaskUsingKeyboard);
    addBtn.addEventListener("click",checkedboxCount);
    todo.addEventListener("keypress",checkedboxCount);
}

function chooseDataStorage(){
    displayTasks();
    checkedboxCount();
    alertMsg.totalMsg();
    clearAndFocusInputField();
}

function displayTasks(){
    var list=document.getElementById('ul');
    var localStorageValue = 'LocalStorage';
    var sessionStorageValue = 'SessionStorage';
    var Key = 'taskListKK';
    var selectedOption=document.getElementById("storage").value;
    if(selectedOption === localStorageValue || selectedOption === sessionStorageValue){
        storageManagerInstance = new StorageManager (selectedOption,Key);
    }
    if(selectedOption === localStorageValue || selectedOption === sessionStorageValue){
        list.innerHTML = '';
        getData();
        
        for(i=0; i<taskData.length; i++){
        creatingNewElements(taskData[i].name);
        }
        attachingEventHandlers();
    }
    else{
        emptyList();
    }
}

function getData(){
    taskData = storageManagerInstance.getData();
}

function setData(){
    storageManagerInstance.setData(taskData);
}

function append(tasks){
    var list=document.getElementById('ul');
    list.appendChild(tasks);
}

function toAddTasks(){
    var todo =document.getElementById('input');
    input = todo.value;
    if(input ==="")
    {
        alert(alertMsg.input);
    }
    else 
    {
    var todos={ id:Date.now(), name:input, status:false}
    taskData.push(todos)
    setData();
    creatingNewElements(input);
    attachingEventHandlers();
    clearAndFocusInputField();
    }
}

function addTaskUsingMouse(){
    toAddTasks();
}

function addTaskUsingKeyboard(){
    var enterKey = 13;
    if(event.keyCode === enterKey){
    toAddTasks();
    }
}

function deletingTaskFromList(){
    var deletingItem = this.getAttribute('id')
    removingFromArray(deletingItem)
    var div=this.parentElement;
    div.remove();
    setData();
    clearAndFocusInputField();
}

function removingFromArray(deletingItem){
    var itemToBeDeleted = deletingItem;
    var deleteObject = taskData.find(function (element){
        return element.name === itemToBeDeleted;
    });
    var itemIndex = taskData.indexOf(deleteObject);
    taskData.splice(itemIndex,1);
    }

function checkedboxCount(){
    var checkboxValues = [];
    var checkbox= document.querySelectorAll('input[type="checkbox"]:checked')
    var pending;
    var checkedboxs;
    for(var i = 0; i < checkbox.length; i++) {
        checkboxValues.push(checkbox[i].checked);
        }
        checkedboxs = checkboxValues.filter(function (e){
            return e === true;
        })
        pending = taskData.length - checkedboxs.length
        totalMsg(checkedboxs,pending);           
}

function checkboxElement(li){
    var checkBox = document.createElement('INPUT');
    checkBox.type = 'checkbox';
    checkBox.setAttribute('id',Date.now())
    checkBox.setAttribute('class','check')
    attachingCheckBoxEventHandler(checkBox);
    li.appendChild(checkBox);
  }

function attachingCheckBoxEventHandler (checkBox){
    checkBox.addEventListener('click',checkedboxCount);
    checkBox.addEventListener('click',togetstatus)
}

function spanElement(li,input){
    var span = document.createElement("SPAN");
    var item = document.createTextNode(input)
    span.appendChild(item);
    li.appendChild(span);
}

function deleteButtonElement(li,input){
    var deleteButton = document.createElement('BUTTON')
    deleteButton.innerHTML = "Del"
    deleteButton.setAttribute('class','remove')
    deleteButton.setAttribute('id',input)
    attachingDeleteButtonEventHandler(deleteButton)
    checkedboxCount();
    li.appendChild(deleteButton);
}

function attachingDeleteButtonEventHandler (deleteButton){
    deleteButton.addEventListener('click',deletingTaskFromList)
    deleteButton.addEventListener('click',checkedboxCount)
}

function togetstatus(){
    var checkBox=this.getAttribute('id');
    console.log(checkBox);

}

init();