var storageManagerInstance;
var taskData;
var selectedOption;
var alertMsg = {
    input:"Enter Valid Input",
    empty:"-------List is Empty-------",
    totalMsg: function (){
        var defaultOption = 'Select the Storage type';
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
    var checkbox= document.getElementsByClassName("checkbox");
    var addBtn = document.getElementById('addBtn');
    var buttons = document.getElementsByClassName('remove');
    var todo =document.getElementById('input');

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
    displayTasks();
    checkedboxCount();
    alertMsg.totalMsg();
}

function displayTasks(){
    var unorderedList=document.getElementById('ul');
    var localStorageValue = 'LocalStorage';
    var sessionStorageValue = 'SessionStorage';
    var Key = 'taskListKK';
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
    var unorderedList=document.getElementById('ul');
    unorderedList.appendChild(task);
}

function toAddTasks(){
    var todo =document.getElementById('input');
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
    clearAndFocusInputField();
    }
}

function addTaskUsingMouse(input){
    toAddTasks();
}

function addTaskUsingKeyboard(input){
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
    var itemIndex = taskData.indexOf(itemToBeDeleted);
    taskData.splice(itemIndex,1);
}

function checkedboxCount(){
    var checkboxValues = [];
    var checkbox= document.getElementsByClassName("checkbox");
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

function emptyList(){
    var unorderedList=document.getElementById('ul');
    var defaultOption = 'Select the Storage type';

    unorderedList.innerHTML = alertMsg.empty;
    if(selectedOption === defaultOption)
    {
        unorderedList.innerHTML = alertMsg.empty;
    }
    
}

init();