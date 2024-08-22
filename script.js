
    const inputTask = document.getElementById('input-task');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');
  
    // Função para carregar as tarefas do localStorage
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        addTaskToDOM(task, index);
      });
    }
  
    // Função para adicionar uma tarefa ao DOM
    function addTaskToDOM(task, index) {
      const div = document.createElement('div');
      div.className = 'task';
      div.textContent = task;
  
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remover';
      removeButton.className = 'remove-btn';
      removeButton.onclick = () => removeTask(index);
  
      div.appendChild(removeButton);
      taskList.appendChild(div);
    }
  
    // Função para adicionar uma nova tarefa
    function createTask() {
      const task = inputTask.value.trim();
      if (task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        addTaskToDOM(task, tasks.length - 1);
        inputTask.value = '';
      }
    }
  
    // Função para remover uma tarefa
    function removeTask(index) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      loadTasks();
    }
  
    // Adiciona a tarefa ao clicar no botão
    addTaskButton.addEventListener('click', createTask);
  
    // Adiciona a tarefa ao pressionar Enter
    inputTask.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        createTask();
      }
    });
  
    // Carrega as tarefas ao iniciar a página
    loadTasks();
  
  