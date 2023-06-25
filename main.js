/-------------Variables & Constants---------------/
const input = document.querySelector('.addTask input');
const tasksContainer = document.querySelector('.tasksContainer');
const addTaskBtn = document.querySelector('.plusTask');
const deleteAll = document.querySelector('.deleteAll');
const completeAll = document.querySelector('.completeAll');
const tasksCount = document.querySelector('.tasksCount span');
const completedTasksCount = document.querySelector('.completedTasksCount span');
const noTasksMessage = document.querySelector('.noTasksMessage');
const closeBtn = document.querySelector('.close');

//Fucus on the input when window is loaded
window.onload = function() {
    input.focus();
    Swal.fire('Hello There!', 'Have a Good Time!'); //make a sweet alert
}
function addTaskFunction() {
    if(input.value == '') {
        Swal.fire('Oops....', 'You cannot add an empty task!'); //make sweet alert error
    }
    else{
if(document.body.contains(noTasksMessage)) {
    noTasksMessage.remove();
}
//Create a span element 
let mainSpan = document.createElement('span');

//Create a delete button 
let deleteBtn = document.createElement('button');

//deffine the input text to put on mainSpan
let inputText = document.createTextNode(input.value);

//put the inputText in the mainSpan
mainSpan.appendChild(inputText);

//deffine the text 'delete' to append it to deleteBtn
let deleteText = document.createTextNode('Delete');

//put the deleteText in the deleteBtn
deleteBtn.appendChild(deleteText);

//add a class name to the mainSpan
mainSpan.className = 'taskBox';

//add a class name to the deleteBtn
deleteBtn.className = 'delete';

//append the deleteBtn to the mainSpan
mainSpan.appendChild(deleteBtn);

//create readBtn
let readBtn = document.createElement('button');

//create readText
let readText = document.createTextNode('Read');

//append readText to readBtn
readBtn.appendChild(readText);

//add a class name to the readBtn
readBtn.className = 'readBtn';

//append readBtn to the mainSpan
mainSpan.appendChild(readBtn);

readBtn.addEventListener('click', function() {
  var tts = window.speechSynthesis;
    var speech = new SpeechSynthesisUtterance(mainSpan.innerText);
    tts.speak(speech);
});
//append the mainSpan to the tasksContainer
tasksContainer.appendChild(mainSpan);

//empty the input after adding new task
input.value = '';

//focus on the input
input.focus();

//turn on calculateTasks function to calculate the tasks number when ever any task is added
calculateTasks();
    }
}
window.addEventListener('keydown', function(keyEvent) {
if(keyEvent.keyCode == 13) {
    //turn on addTaskFunction()
addTaskFunction();
}
});
addTaskBtn.onclick = addTaskFunction;
//When deleteBtn is clicked
document.addEventListener('click', function(e) {
    if(e.target.className == 'delete') {
        var ask = Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to regain this task!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then((result) => {
            if (result.isConfirmed) {
                e.target.parentNode.remove();
              Swal.fire(
                'Deleted!',
                'Your task has been deleted',
                'success'
              )
            // For more information about handling dismissals please visit
            // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Cancelled',
                'Your task wasn"t deleted',
                'error'
              )
            }
            if(tasksContainer.childElementCount == 0) {
                createNoTasksMessage();
            }
          });
          if(tasksContainer.childElementCount == 0) {
            createNoTasksMessage();
        }
          
    }
    //When the task is clicked
    if(e.target.classList.contains('taskBox')) {
        e.target.classList.toggle('finished');
    }
    calculateTasks();
});
deleteAll.onclick = function() {

    var ask = Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to regain all the tasks!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      })
      .then((result) => {
        if (result.isConfirmed) {
            document.querySelectorAll('.taskBox').forEach(taskWillBeDeleted => {
                taskWillBeDeleted.remove();
                createNoTasksMessage();
            });
          Swal.fire(
            'Deleted!',
            'Your task has been deleted',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your Tasks Are"nt Deleted',
            'error'
          )
        }
      })
}
//create no tasks message function
function createNoTasksMessage() {
    //create message
    let message = document.createElement('span');

    //create the message's text
    let messageText = document.createTextNode('No Tasks To Show');

    //add messageText to message
    message.appendChild(messageText)

    //add class name to the message
    message.className = 'noTasksMessage';

    //apend the message to the tasksContainer
    tasksContainer.appendChild(message);
}

//Create calculateTasks function
function calculateTasks() {

    //the length of the takBoxes
    tasksCount.innerHTML = document.querySelectorAll('.taskBox').length;

    //the length of the completed takBoxes
    completedTasksCount.innerHTML = document.querySelectorAll('.taskBox.finished').length;
}
completeAll.onclick = function() {
    document.querySelectorAll('.taskBox').forEach((taskWillBeCompleted) => {
        taskWillBeCompleted.classList.toggle('finished');
    })
}
closeBtn.onclick = function() {
closeBtn.innerHTML = '🔒';
document.querySelectorAll('.taskBox').forEach(task => {
    task.classList.add('hidden');
});
}
closeBtn.ondblclick = function() {
    closeBtn.innerHTML = '🔓';
    document.querySelectorAll('.taskBox').forEach(task => {
        task.classList.remove('hidden');
    });
    }
    if(tasksContainer.childElementCount == 0) {
        createNoTasksMessage();
    }
