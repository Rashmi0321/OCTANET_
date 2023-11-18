document.getElementById('taskForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const taskInput = document.getElementById('taskInput').value;
  const prioritySelect = document.getElementById('prioritySelect').value;
  
  if (taskInput.trim() !== '') {
    const task = {
      name: taskInput,
      priority: prioritySelect
    };
    
    addTaskToList(task);
  }
  
  document.getElementById('taskInput').value = '';
});

function addTaskToList(task) {
  const taskList = document.getElementById('taskList');
  const newTask = document.createElement('li');
  newTask.textContent = `${task.name} - Priority: ${task.priority}`;
  taskList.appendChild(newTask);
  
  taskInput.value = "";
  newTask.addEventListener('click', function(){ 
    newTask.style.textDecoration = "line-through"; 
  })
  newTask.addEventListener('dblclick', function(){ 
      taskList.removeChild (newTask);
  })

  shuffleTasks();
}

function shuffleTasks() {
  const ul = document.getElementById('taskList');
  const highPriority = [];
  const mediumPriority = [];
  const lowPriority = [];

  // Separate tasks based on priorities
  for (let i = 0; i < ul.children.length; i++) {
    const task = ul.children[i];
    const priority = task.textContent.split(' - Priority: ')[1];
    if (priority === 'high') {
      highPriority.push(task);
    } else if (priority === 'medium') {
      mediumPriority.push(task);
    } else if (priority === 'low') {
      lowPriority.push(task);
    }
  }

  // Clear the task list
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  // Shuffle each priority group separately
  shuffleArray(highPriority);
  shuffleArray(mediumPriority);
  shuffleArray(lowPriority);

  // Append shuffled tasks back to the list
  highPriority.forEach(task => ul.appendChild(task));
  mediumPriority.forEach(task => ul.appendChild(task));
  lowPriority.forEach(task => ul.appendChild(task));
}

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}