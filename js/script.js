$(document).ready(function () {
  const $inputTask = $('#input-task')
  const $taskList = $('#task-list');
  const $addTaskButton = $('#add-task-button');

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
    $taskList.html('')
    tasks.forEach((task) => {
      addTask(task);
    });
  }
  
  // Adiciona os dados obtidos do localStorage na tela
  function addTask(task) {
    const $taskDiv = $('<div></div>')
    $taskDiv.addClass('task')
    if (task.completed) {
      $taskDiv.addClass('task-completed')
    }
  
    const $checkTask = $('<i></i>')
    if (task.completed) {
      $checkTask.addClass('bi bi-check-circle');
      $checkTask.addClass('check')
    } else {
      $checkTask.addClass('bi bi-circle')
    }

    $checkTask.css('cursor','pointer')
    $checkTask.on('click', () => taskCompleted(task, $taskDiv, $checkTask))
  
    const $taskText = $('<p></p>').text(task.text)
    
    const $deleteTask = $('<i></i>')
    $deleteTask.addClass('bi bi-x x')
    $deleteTask.on('click', () => removeTask(task))
  
    $taskDiv.append($checkTask)
    $taskDiv.append($taskText)
    $taskDiv.append($deleteTask)
    $taskList.append($taskDiv)
  }
  
  // Cria uma nova tarefa
  function createTask () {
    const task = $inputTask.val().trim()
  
    if(!task) {
      alert('Tarefa não preenchida')
      return
    }

    let tasks = connectionTasks();
  
    index = tasks.length ? Math.max(...tasks.map(t => t.index)) + 1 : 1
  
    newTask = {
      index: index,
      text: $inputTask.val(),
      completed: false
    }
  
    tasks.push(newTask)
    saveTasks(tasks)
    addTask(newTask, tasks.length - 1)
    loadTasks()
    $inputTask.val('')
  }
  
  // Marca as tarefas concluídas
  function taskCompleted(task) {
    let tasks = connectionTasks();
  
    tasks = tasks.forEach(storedTask => {
      
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
  
  $addTaskButton.on('click', createTask);
  
  loadTasks()
  })