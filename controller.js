var storageManagerInstance
var taskData;
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
    emptyList();
    choosingDataStorage();
}

function choosingDataStorage(){
    window.addEventListener("change",actionsAfterChoosingDataStorage)
}

function actionsAfterChoosingDataStorage(){
    displayTasks();
    calculatingTheCountOfCompletedTasks();
    notifyMessage.totalMsg();
    clearAndFocusInputField();
}

function clearAndFocusInputField(){
    var todo =document.getElementById('inputField');
    todo.value="";
    todo.focus();
}

function attachEvents(){
    var addButton = document.getElementById('addBtn');
    var todo =document.getElementById('inputField');
    addButton.addEventListener("click",addTaskUsingMouseEvent);
    todo.addEventListener("keypress",addTaskUsingKeyboardEvent);
    window.addEventListener('click', calculatingTheCountOfCompletedTasks);
    window.addEventListener('keypress', calculatingTheCountOfCompletedTasks);
}

function getData(){
    taskData = storageManagerInstance.getData();
}

function setData(){
    storageManagerInstance.setData(taskData);
}

function appendToList(createdElements){
    var list=document.getElementById('ul');
    list.appendChild(createdElements);
}

function ToCreateStorageInstance(){
    this.localStorageValue = 'LocalStorage';
    this.sessionStorageValue = 'SessionStorage';
    this.selectedOption=document.getElementById("storage").value;
    this.key = 'taskListKK';
    if(this.selectedOption === this.localStorageValue || this.selectedOption === this.sessionStorageValue){
        storageManagerInstance = new StorageManager (this.selectedOption,this.key);
    }
}

function ToAddTasks(){
    this.todo =document.getElementById('inputField');
    this.inputField = this.todo.value;
    this.localStorageValue = 'LocalStorage';
    this.sessionStorageValue = 'SessionStorage';
    this.selectedOption=document.getElementById("storage").value;
    if(this.inputField ===""){
        alert(notifyMessage.inputField);
    }
    else {
        if(this.selectedOption === this.localStorageValue || this.selectedOption === this.sessionStorageValue){
        this.todos={ id:Date.now(), name:inputField, status:false}
        taskData.push(this.todos)
        setData();
        creatingNewElements(this.inputField);
        attachEvents();
        clearAndFocusInputField();
        }
    }
}

function displayTasks(){
    var list=document.getElementById('ul');
    var localStorageValue = 'LocalStorage';
    var sessionStorageValue = 'SessionStorage';
    var selectedOption=document.getElementById("storage").value;
    ToCreateStorageInstance()
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

function addTaskUsingMouseEvent(){
    ToAddTasks();

}

function addTaskUsingKeyboardEvent(){
    var enterKey = 13;
    if(event.keyCode === enterKey){
    ToAddTasks();
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

function selectCheckBox(e,checkBox,item){
    var checkBox = document.createElement('INPUT');
    var checkStatus = e.target.checked
    item = this.nextElementSibling.textContent;
    var selectedItem = taskData.find(function (element){
    return element.name === item ;
    });
    var itemIndex = taskData.indexOf(selectedItem);
    taskData[itemIndex].status = checkStatus
    toggleCheckBox(checkbox,itemIndex = taskData.indexOf(selectedItem));
    checkBox.checked = taskData[itemIndex].status
    console.log(checkBox.checked)
    setData();   
    }

function toggleCheckBox(checkbox,itemIndex){
    var checkbox= document.querySelectorAll('input[type="checkbox"]')
    for(var i =0 ; i < checkbox.length ; i++){
    checkbox.checked = taskData[itemIndex].status;
    }
    console.log(checkbox.checked = taskData[itemIndex].status)
}

function calculatingTheCountOfCompletedTasks() {
    var checkbox= document.querySelectorAll('input[type="checkbox"]:checked')
    var pending;
    var checkedCount=0
    for(var i = 0; i < checkbox.length; i++) {
        checkboxCount= (checkbox[i].checked) ? checkedCount++:checkedCount--;
    }
    pending = taskData.length - checkedCount
    totalMsg(checkedCount,pending);
}

function checkbox(li){
    var checkBox = document.createElement('INPUT');
    checkBox.type = 'checkbox';
    checkBox.setAttribute('id','check')
    attachCheckBoxEvent(checkBox);
    li.appendChild(checkBox);
  }

function attachCheckBoxEvent (checkBox){
    checkBox.addEventListener('click',selectCheckBox)
}

function todoTask(li,inputField){
    var span = document.createElement("SPAN");
    var item = document.createTextNode(inputField)
    span.appendChild(item);
    li.appendChild(span);
}

function deleteButton(li){
    var deleteButton = document.createElement('BUTTON')
    deleteButton.innerHTML = "Del"
    deleteButton.setAttribute('class','remove')
    deleteButton.setAttribute('id',Date.now())
    attachDeleteButtonEvent(deleteButton)
    li.appendChild(deleteButton);
}

function attachDeleteButtonEvent (deleteButton){
    deleteButton.addEventListener('click',deletingTaskFromList)
}

init();