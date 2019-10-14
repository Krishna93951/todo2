var todo =document.getElementById('input');
var unorderedList=document.getElementById('ul');
var localStorageValue = 'LocalStorage';
var sessionStorageValue = 'SessionStorage';
var defaultOption = 'Select the Storage type';
var addBtn = document.getElementById('addBtn');
var buttons = document.getElementsByClassName('remove');
var Key = 'taskListKK';
var enterKey = 13;
var checkbox= document.getElementsByClassName("checkbox");
var storageManagerInstance;
var itemToBeDeleted;
var itemIndex;
var taskData;
var div;
var selectedOption;
var deletingItem;

var alertMsg = {
    input:"Enter Valid Input",
    empty:"-------List is Empty-------",
    totalMsg: function (){
        if(selectedOption === defaultOption){
            return totalTodos.innerHTML =   countMessage.all +'0'+" "+countMessage.completed+'0'+" "+  countMessage.pending+'0' ;
        }
    }
}

function init(){
    attachingEventHandlers();
    emptyList();
}

function inputFieldOperations(){
    todo.value="";
    todo.focus();
}

function attachingEventHandlers(){
    addBtn.addEventListener("click",addTaskUsingMouse);
    todo.addEventListener("keypress",addTaskUsingKeyboard);
    addBtn.addEventListener("click",checkedboxCount);
    todo.addEventListener("keypress",checkedboxCount);
    for (var i = 0; i <buttons.length; i++) {
        checkbox[i].addEventListener("click",checkedboxCount);
        buttons[i].addEventListener("click",deletingTaskFromList)
        buttons[i].addEventListener("click",checkedboxCount);
    }
}

function chooseDataStorage(){
    selectedOption=document.getElementById("storage").value
    showTodoTasks();
    checkedboxCount();
    alertMsg.totalMsg();
}

function showTodoTasks(){
    if(selectedOption === localStorageValue || selectedOption === sessionStorageValue){
        storageManagerInstance = new StorageManager (selectedOption,Key);
    }
    if(selectedOption === localStorageValue || selectedOption === sessionStorageValue){
        unorderedList.innerHTML = '';
        getData();
        for(i=0; i<taskData.length; i++){
        display(taskData[i]);
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

function append(task){
unorderedList.appendChild(task);
}

function addTaskUsingMouse(){
    input = todo.value;
    if(input ==="")
    {
        alert(alertMsg.input);
    }
    else {
    taskData.push(input)
    setData();
    display(input);
    attachingEventHandlers();
    inputFieldOperations();
    }
}

function addTaskUsingKeyboard(){
    input = todo.value;
    if(event.keyCode === enterKey){
    if(input ==="")
    {
        alert(alertMsg.input);
    }
    else {
        taskData.push(input)
        setData();
        display(input);
        attachingEventHandlers();
        inputFieldOperations();
    }
    }
}

function deletingTaskFromList(){
    deletingItem = this.getAttribute('id')
    removingFromArray(deletingItem)
    div=this.parentElement;
    div.remove();
    setData();
    inputFieldOperations();
}

function removingFromArray(deletingItem){
    itemToBeDeleted = deletingItem;
    itemIndex = taskData.indexOf(itemToBeDeleted);
    taskData.splice(itemIndex,1);
}

function checkedboxCount(){
    var checkboxValues = [];
    for(var i = 0; i < checkbox.length; i++) {
    checkboxValues.push(checkbox[i].checked ? checkbox[i].checked = true:checkbox[i].checked = false);
        }
        var checkedboxs = checkboxValues.filter(function (e){
            return e === true;
        })
        var pending = taskData.length - checkedboxs.length
        totalMsg(checkedboxs,pending);           
}

function emptyList(){
    unorderedList.innerHTML = alertMsg.empty;
    if(selectedOption === defaultOption)
    {
        unorderedList.innerHTML = alertMsg.empty;
    }
    
}

init();