var storageManagerInstance;
var taskData;
var notifyMessage = {
    input:"Enter Valid Input",
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
}

function clearAndFocusInputField(){
    var todo =document.getElementById('input');
    todo.value="";
    todo.focus();
}

function attachingEventListners(){
    var addButton = document.getElementById('addBtn');
    var todo =document.getElementById('input');
    addButton.addEventListener("click",addTaskUsingMouse);
    todo.addEventListener("keypress",addTaskUsingKeyboard);
    addButton.addEventListener("click",checkedboxCount);
    todo.addEventListener("keypress",checkedboxCount);
}

function chooseDataStorage(){
    displayTasks();
    checkedboxCount();
    notifyMessage.totalMsg();
    clearAndFocusInputField();
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

function instanceCreation(){
    var localStorageValue = 'LocalStorage';
    var sessionStorageValue = 'SessionStorage';
    var selectedOption=document.getElementById("storage").value;
    var Key = 'taskListKK';
    if(selectedOption === localStorageValue || selectedOption === sessionStorageValue){
        storageManagerInstance = new StorageManager (selectedOption,Key);
    }
}

function toAddTasks(){
    var todo =document.getElementById('input');
    input = todo.value;
    var localStorageValue = 'LocalStorage';
    var sessionStorageValue = 'SessionStorage';
    var selectedOption=document.getElementById("storage").value;
    if(input ===""){
        alert(notifyMessage.input);
    }
    else {
        if(selectedOption === localStorageValue || selectedOption === sessionStorageValue){
        var todos={ id:Date.now(), name:input, status:false}
        taskData.push(todos)
        setData();
        creatingNewElements(input);
        attachingEventListners();
        clearAndFocusInputField();
        }
    }
}

function displayTasks(){
    var list=document.getElementById('ul');
    var localStorageValue = 'LocalStorage';
    var sessionStorageValue = 'SessionStorage';
    var selectedOption=document.getElementById("storage").value;
    instanceCreation();
    if(selectedOption === localStorageValue || selectedOption === sessionStorageValue){
        list.innerHTML = '';
        getData();
        for(i=0; i<taskData.length; i++){
        creatingNewElements(taskData[i].name,taskData[i].status);
        }
        attachingEventListners();
    }
    else{
        emptyList();
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
    var checkStatus = e.target.checked
    item = this.nextElementSibling.textContent;
    var selectedItem = taskData.find(function (element){
    return element.name === item ;
    });
    var itemIndex = taskData.indexOf(selectedItem);
    taskData[itemIndex].status = checkStatus
    toggleCheckBox(checkBox,itemIndex = taskData.indexOf(selectedItem));
    setData();   
    }

function toggleCheckBox(checkbox,itemIndex){
    var checkbox= document.querySelectorAll('input[type="checkbox"]')
    for(var i =0 ; i < checkbox.length ; i++){
    checkbox.checked = taskData[itemIndex].status;
    }
}

function checkedboxCount() {
    var checkbox= document.querySelectorAll('input[type="checkbox"]:checked')
    var pending;
    var checkedCount=0
    for(var i = 0; i < checkbox.length; i++) {
        checkboxCount= (checkbox[i].checked) ? checkedCount++:checkedCount--;
    }
    pending = taskData.length - checkedCount
    totalMsg(checkedCount,pending);
}

function checkboxElement(li,itemIndex){
    var checkBox = document.createElement('INPUT');
    checkBox.type = 'checkbox';
    checkBox.setAttribute('id','check')
    attachingCheckBoxEventListner(checkBox);    
    li.appendChild(checkBox);
  }

function attachingCheckBoxEventListner (checkBox){
    checkBox.addEventListener('click',checkedboxCount);
    checkBox.addEventListener('click',selectCheckBox)
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
    deleteButton.setAttribute('id',Date.now())
    attachingDeleteButtonEventListner(deleteButton)
    checkedboxCount();
    li.appendChild(deleteButton);
}

function attachingDeleteButtonEventListner (deleteButton){
    deleteButton.addEventListener('click',deletingTaskFromList)
    deleteButton.addEventListener('click',checkedboxCount)
}

init();