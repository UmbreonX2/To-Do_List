document.addEventListener('DOMContentLoaded', () => {
const inputTask = document.getElementById('input-task')
const taskList = document.getElementById('task-list');
const addTaskButton = document.getElementById('add-task-button');

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || []
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    addTask(task);
  });
}

function addTask(task) {
  const taskDiv = document.createElement('div')
  taskDiv.classList.add('task')
  if (task.completed) {
    taskDiv.classList.add('task-completed')
  }

  const checkTask = document.createElement('i')
  checkTask.classList.add('bi', 'bi-circle')
  checkTask.style.cursor = 'pointer'
  checkTask.onclick = () => taskCompleted(taskDiv, checkTask)

  const taskText = document.createElement('p')
  taskText.innerText = task.text
  

  const deleteTask = document.createElement('i')
  deleteTask.classList.add('bi', 'bi-trash-fill')
  deleteTask.onclick = () => removeTask(task)

  taskDiv.appendChild(checkTask)
  taskDiv.appendChild(taskText)
  taskDiv.appendChild(deleteTask)
  taskList.appendChild(taskDiv)

  console.log('entrou')
}

function createTask () {
  const task = inputTask.value.trim()

  if(!task) {
    alert('Tarefa não preenchida')
    return
  }
  const newTask = JSON.parse(localStorage.getItem('tasks')) || []

  index = newTask.length ? newTask[newTask.length - 1].index + 1 : 1

  objectTask = {
    index: index,
    text: inputTask.value,
    completed: false
  }

  newTask.push(objectTask)
  localStorage.setItem('tasks', JSON.stringify(newTask))
  addTask(objectTask, newTask.length - 1)
  inputTask.value = ''
}

function taskCompleted(taskDiv, checkTask) {
  if (taskDiv.classList.contains('task-completed')) {
    taskDiv.classList.remove('task-completed');
    checkTask.classList.remove('bi-check-circle-fill');
    checkTask.classList.add('bi-circle');
  } else {
    taskDiv.classList.add('task-completed');
    checkTask.classList.remove('bi-circle');
    checkTask.classList.add('bi-check-circle-fill');
  }
}

function removeTask(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || []
  tasks = tasks.filter(newTasks => newTasks.index !== task.index)
  localStorage.setItem('tasks', JSON.stringify(tasks))
  loadTasks()
}


addTaskButton.addEventListener('click', createTask);

loadTasks()
})