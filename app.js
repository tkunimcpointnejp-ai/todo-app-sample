const STORAGE_KEY = 'todos';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filter-btn');

let todos = loadTodos();
let currentFilter = 'all';

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (todo) =>
        typeof todo === 'object' &&
        todo !== null &&
        typeof todo.id === 'number' &&
        typeof todo.text === 'string' &&
        typeof todo.completed === 'boolean'
    );
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function shouldShowTodo(todo) {
  if (currentFilter === 'active') {
    return !todo.completed;
  }

  if (currentFilter === 'completed') {
    return todo.completed;
  }

  return true;
}

function createTodoItem(todo) {
  const listItem = document.createElement('li');
  listItem.className = 'todo-item';

  const textButton = document.createElement('button');
  textButton.type = 'button';
  textButton.className = 'todo-text-btn';
  textButton.textContent = todo.text;
  textButton.setAttribute('aria-pressed', String(todo.completed));

  if (todo.completed) {
    listItem.classList.add('is-completed');
  }

  textButton.addEventListener('click', () => {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
  });

  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.className = 'delete-btn';
  removeButton.textContent = 'Remove';

  removeButton.addEventListener('click', () => {
    todos = todos.filter((item) => item.id !== todo.id);
    saveTodos();
    renderTodos();
  });

  listItem.append(textButton, removeButton);
  return listItem;
}

function renderTodos() {
  list.textContent = '';

  todos.filter(shouldShowTodo).forEach((todo) => {
    list.appendChild(createTodoItem(todo));
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskText = input.value.trim();
  if (!taskText) {
    return;
  }

  todos.push({
    id: Date.now(),
    text: taskText,
    completed: false,
  });

  saveTodos();
  renderTodos();

  form.reset();
  input.focus();
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach((candidate) => {
      candidate.classList.toggle('is-active', candidate === button);
    });

    renderTodos();
  });
});

renderTodos();
