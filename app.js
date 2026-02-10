const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskText = input.value.trim();
  if (!taskText) {
    return;
  }

  const listItem = document.createElement('li');
  listItem.className = 'todo-item';

  const textSpan = document.createElement('span');
  textSpan.textContent = taskText;

  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.className = 'delete-btn';
  removeButton.textContent = 'Remove';

  removeButton.addEventListener('click', () => {
    listItem.remove();
  });

  listItem.append(textSpan, removeButton);
  list.appendChild(listItem);

  form.reset();
  input.focus();
});
