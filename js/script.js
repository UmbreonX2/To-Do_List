document.addEventListener('DOMContentLoaded', () => {
  const inputTask = document.getElementById('input-task')
  const taskList = document.getElementById('task-list');
  const addTaskButton = document.getElementById('add-task-button');

  // Conexão com o localStorage
  function connectionTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }

  // Save do localStorage
  function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  // Atualizar a página com as novas informações contidas no localStorage
  function loadTasks() {
    let tasks = connectionTasks();
    tasks = tasks.sort((a, b) => a.completed - b.completed)
    taskList.innerHTML = '';
    tasks.forEach((task) => {
      addTask(task);
    });
  }
  
  // Adiciona os dados obtidos do localStorage na tela
  function addTask(task) {
    const taskDiv = document.createElement('div')
    taskDiv.classList.add('task')
    if (task.completed) {
      taskDiv.classList.add('task-completed')
    }
  
    const checkTask = document.createElement('i')
    if (task.completed) {
      checkTask.classList.add('bi','bi-check-circle');
      checkTask.classList.add('check')
    } else {
      checkTask.classList.add('bi', 'bi-circle')
    }

    checkTask.style.cursor = 'pointer'
    checkTask.onclick = () => taskCompleted(task, taskDiv, checkTask)
  
    const taskText = document.createElement('p')
    taskText.innerText = task.text
    
  
    const deleteTask = document.createElement('i')
    deleteTask.classList.add('bi', 'bi-x', 'x')
    deleteTask.onclick = () => removeTask(task)
  
    taskDiv.appendChild(checkTask)
    taskDiv.appendChild(taskText)
    taskDiv.appendChild(deleteTask)
    taskList.appendChild(taskDiv)
  }
  
  // Cria uma nova tarefa
  function createTask () {
    const task = inputTask.value.trim()
  
    if(!task) {
      alert('Tarefa não preenchida')
      return
    }

    let tasks = connectionTasks();
  
    index = tasks.length ? Math.max(...tasks.map(t => t.index)) + 1 : 1
  
    objectTask = {
      index: index,
      text: inputTask.value,
      completed: false
    }
  
    tasks.push(objectTask)
    saveTasks(tasks)
    addTask(objectTask, tasks.length - 1)
    loadTasks()
    inputTask.value = ''
  }
  
  // Marca as tarefas concluídas
  function taskCompleted(task) {
    let tasks = connectionTasks();
  
    tasks = tasks.map(storedTask => {
      
      if (storedTask.index === task.index) {
        storedTask.completed = !storedTask.completed;
      }
  
      saveTasks(tasks)
      loadTasks()
    })}
  
  // Remove as tarefas
  function removeTask(task) {
    let tasks = connectionTasks();
    tasks = tasks.filter(newTasks => newTasks.index !== task.index)
    saveTasks(tasks)
    loadTasks()
  }
  
  addTaskButton.addEventListener('click', createTask);
  
  loadTasks()
  })