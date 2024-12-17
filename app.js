document.addEventListener('DOMContentLoaded', () => {
  loadTodos();
});

function addTodo() {
  const todoName = document.getElementById('todoName').value.trim();
  const todoStatus = document.getElementById('todoStatus').value;

  if (todoName) {
      const todo = { name: todoName, status: todoStatus };

      let todos = JSON.parse(localStorage.getItem('todos')) || [];   /*This is the array */
      todos.push(todo);                                              /* pushing into array */
      localStorage.setItem('todos', JSON.stringify(todos));

      document.getElementById('todoName').value = '';
      document.getElementById('todoStatus').value = 'incomplete';

      loadTodos();
  }
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';

  todos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.classList.add(todo.status);
      li.innerHTML = `
          <span>${todo.name} - ${todo.status}</span>
          <button class="delete-btn" onclick="deleteTodo(${index})">Delete</button>
      `;
      todoList.appendChild(li);
  });
}

function deleteTodo(index) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  loadTodos();
}

function clearAllTodos() {
  localStorage.removeItem('todos');
  loadTodos();
}

function searchTodo() {
  const searchText = document.getElementById('searchText').value.toLowerCase();
  const statusFilter = document.getElementById('statusFilter').value;

  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  const filteredTodos = todos.filter(todo => {
      const matchesText = todo.name.toLowerCase().includes(searchText);
      const matchesStatus = statusFilter ? todo.status === statusFilter : true;
      return matchesText && matchesStatus;
  });

  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';

  filteredTodos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.classList.add(todo.status);
      li.innerHTML = `
          <span>${todo.name} - ${todo.status}</span>
          <button class="delete-btn" onclick="deleteTodo(${index})">Delete</button>
      `;
      todoList.appendChild(li);
  });
}