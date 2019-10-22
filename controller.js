var taskData 
var notifyMessage = {
    inputField:"Enter Valid Input",
    empty:"----------------------------List is Empty---------------------------",
    totalMsg: function (){
        var defaultOption = 'Select the Storage type';
        var selectedOption=document.getElementById("storage").value
        if(selectedOption === defaultOption){
             emptyListMsg();
        }
    }
}

function init(){
    selectionOfStorage();
    emptyList();
}

function selectionOfStorage(){
    var selectedOption=document.getElementById("storage");
    selectedOption.addEventListener("change",actionsAfterChoosingDataStorage)
}

function actionsAfterChoosingDataStorage(){
    displayTasks();
    clearAndFocusInputField();
    notifyMessage.totalMsg();
    calculatingTheCountOfCompletedTasks();
}

function clearAndFocusInputField(){
    var todo =document.getElementById('inputField');
    todo.value="";
    todo.focus();
}

function attachEvents(){
    var addButton = document.getElementById('addBtn');
    var todo =document.getElementById('inputField');
    addButton.addEventListener("click",addTaskToList);
    todo.addEventListener("keypress",addTaskToListByEnterKey);
    addButton.addEventListener('click', calculatingTheCountOfCompletedTasks);
    todo.addEventListener('keypress', calculatingTheCountOfCompletedTasks);
}

function getData(){
   taskData = toCreateStorageInstance().getData();
}

function setData(){
    toCreateStorageInstance().setData(taskData);
}

function appendToList(createdElements){
    var list=document.getElementById('todoList');
    list.appendChild(createdElements);
}

function toCreateStorageInstance(){
    var localStorageValue = 'LocalStorage';
    var sessionStorageValue = 'SessionStorage';
    var selectedOption=document.getElementById("storage").value;
    var key = 'taskListKK';
    if(selectedOption === localStorageValue || selectedOption === sessionStorageValue){
        return new StorageManager (selectedOption,key);
    }
}

function ToAddTasks(){
    var todo =document.getElementById('inputField');
    var inputField = todo.value;
    this.localStorageValue = 'LocalStorage';
    this.sessionStorageValue = 'SessionStorage';
    this.selectedOption=document.getElementById("storage").value;
    if(inputField ===""){
        alert(notifyMessage.inputField);
    }
    else {
        if(this.selectedOption === this.localStorageValue || this.selectedOption === this.sessionStorageValue){
        this.todos={ id:Date.now(), name:inputField, status:false};
        taskData.push(this.todos);
        setData();
        creatingNewElements(inputField);
        attachEvents();
        clearAndFocusInputField();
        }
    }
}

function displayTasks(localStorageValue,sessionStorageValue,selectedOption,todos){
    var list=document.getElementById('todoList');
    //ToAddTasks.call(this,localStorageValue,sessionStorageValue,selectedOption,todos)
    var localStorageValue = 'LocalStorage';
    var sessionStorageValue = 'SessionStorage';
    var selectedOption=document.getElementById("storage").value;
    if(selectedOption === localStorageValue || selectedOption === sessionStorageValue){
        list.innerHTML = "";
        getData();
        for(i=0; i<taskData.length; i++){
        creatingNewElements(taskData[i].name);
        }
        attachEvents();
    }
    else{
        emptyList();
        emptyListMsg();
    }
}

function addTaskToList(){
    addToList = new ToAddTasks();
}

function addTaskToListByEnterKey(){
    var enterKey = 13;
    if(event.keyCode === enterKey){
    addToListByKey = new ToAddTasks();
    }
}

function deletingTaskFromList(){
    var deletingItem = this.previousElementSibling.textContent;
    removingTasksFromArray(deletingItem)
    this.parentNode.remove();
    setData();
    clearAndFocusInputField();
}

function removingTasksFromArray(deletingItem){
    var deleteObject = taskData.find(function (element){
        return element.name === deletingItem ;
    });
    var itemIndex = taskData.indexOf(deleteObject);
    taskData.splice(itemIndex,1);
    }

function toggleStatusOnCheckState(e,item){
    var checkStatus = e.target.checked;
    item = this.nextElementSibling.textContent;
    var selectedItem = taskData.find(function (element){
    return element.name === item ;
    });
    var itemIndex = taskData.indexOf(selectedItem);
    taskData[itemIndex].status = checkStatus;
    setData();   
    }

function calculatingTheCountOfCompletedTasks() {
    var checkbox= document.querySelectorAll('input[type="checkbox"]:checked');
    var pending;
    var checkedCount = 0;
    for(var i=0;i<checkbox.length;i++){
    checkboxCount= (checkbox[i].checked) ? checkedCount++:checkedCount--;
    }
    pending = taskData.length - checkedCount;
    totalMsg(checkedCount,pending);
}

function checkbox(li){
    var checkBox = document.createElement('INPUT');
    checkBox.type = 'checkbox';
    checkBox.setAttribute('id','check');
    attachCheckBoxEvent(checkBox);
    li.appendChild(checkBox);
  }

function attachCheckBoxEvent (checkBox){
    calculatingTheCountOfCompletedTasks;
    checkBox.addEventListener('click',calculatingTheCountOfCompletedTasks);
    checkBox.addEventListener('click',toggleStatusOnCheckState);
}

function todoTask(li,inputField){
    var span = document.createElement("SPAN");
    var item = document.createTextNode(inputField);
    span.appendChild(item);
    li.appendChild(span);
}

function deleteButton(li){
    var deleteButton = document.createElement('BUTTON');
    deleteButton.innerHTML = "Del";
    deleteButton.setAttribute('class','remove');
    attachDeleteButtonEvent(deleteButton);
    li.appendChild(deleteButton);
}

function attachDeleteButtonEvent (deleteButton){
    deleteButton.addEventListener('click',deletingTaskFromList);
    deleteButton.addEventListener('click',calculatingTheCountOfCompletedTasks);
}

init();