// Array 
var tasksArray = [];

function getTasksFromLocalStorage() {
  var storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasksArray = JSON.parse(storedTasks);
    displayTasks();
  }
}
window.addEventListener('load', getTasksFromLocalStorage);


function addTask() {
  var task = document.getElementById("taskInput").value;
  var contact = document.getElementById("contactInput").value;
  var time = document.getElementById("timeInput").value;
  var date = document.getElementById("dateInput").value;

  var dateParts = date.split("-");
  var year = dateParts[0];
  var month = dateParts[1];
  var day = dateParts[2];

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const currentHour = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();

  // condition for date
  if( year == currentYear && month ==  currentMonth && day < currentDay ){
    alert('Please select true Day');
  }
  else if(year == currentYear && month < currentMonth){
    alert("Please select true Month");
  }
  else if(year < currentYear){
    alert("Please select true Year");
  }
  else{

    // condition for input task
    if (task === "" || contact === "") {
      alert("Please Insert the Title & Description");
    } else {
      var newTask = {
        targetDate: day + "." + month + "." + year + " / " + time,
        title: task,
        description: contact,
        createdDate: currentDay + "." + currentMonth + "." + currentYear + " / " + currentHour + ":" + currentMinutes
      };

      tasksArray.push(newTask);

      document.getElementById("taskInput").value = "";
      document.getElementById("contactInput").value = "";


 // Display tasks after adding
      displayTasks(); 

//change to string
      localStorage.setItem('tasks', JSON.stringify(tasksArray));
    }
  }
}

function displayTasks() {
  var taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasksArray.forEach((task, index) => {
    var li = document.createElement("li");
    var target = document.createElement("div");
    target.className = "target";
    target.textContent = "Target at " + task.targetDate;

    var title = document.createElement("div");
    title.className = "output1";
    title.textContent = task.title;

    var des = document.createElement("div");
    des.className = "output2";
    des.textContent = task.description;

    var createTime = document.createElement("span");
    createTime.className = "output3";
    createTime.textContent = "Created at " + task.createdDate;

    var removeBtn = document.createElement("button");
    removeBtn.innerHTML = "<b>Done <span>&#10003;</span></b>";
    removeBtn.className = "removeBtn";
    removeBtn.onclick = function () {
      removeTask(index);
    };

    li.appendChild(target);
    li.appendChild(title);
    li.appendChild(des);
    li.appendChild(removeBtn);
    li.appendChild(createTime);

    taskList.appendChild(li);
  });

// change to sting 
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

function removeTask(index) {
  tasksArray.splice(index, 1);
  displayTasks();

//add to local storage
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
}
function sortTasksByIndexDescending() {
  tasksArray.sort().reverse();

  displayTasks();
}

// change inner text

var isAscending = true;

function toggleSortButtonText() {
  var sortBtn = document.getElementById("sortBtn");

  if (isAscending) {
    sortBtn.innerHTML = "<i class='fas fa-sort-down' style='--fa-primary-color: #000000; --fa-secondary-color: #000000; --fa-secondary-opacity: 0.3;'></i>"
    
  } else {
    sortBtn.innerHTML = "<i class='fas fa-sort-up' style='--fa-primary-color: #000000; --fa-secondary-color: #000000; --fa-primary-opacity: 0.3;'></i>"
  }

  isAscending = !isAscending;
}

document.getElementById("sortBtn").addEventListener("click", toggleSortButtonText);


 
