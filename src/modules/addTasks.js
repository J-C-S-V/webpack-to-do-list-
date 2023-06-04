import removeTask from './removeTasks.js';
import isCompleted from './isCompleted.js';
import renderList from './renderList.js';
import clearAllCompleted from './clearAllCompleted.js';
import updateLocalStorage from './updateLocalStorage.js';

renderList();

const ul = document.querySelector('.main__ul');
const input = document.querySelector('.main__input');

let number = 0;

function addTasks(event) {
  const tasks = (JSON.parse(localStorage.getItem('tasks'))) || [];
  event.preventDefault();
  const taskObject = {
    index: number,
    description: input.value,
    completed: false,
  };
  number += 1;
  if (input.value === '') return;

  const li = document.createElement('li');
  li.classList.add('list__item');
  li.dataset.id = taskObject.index;
  li.innerHTML = `
    <input type="checkbox" class="list__item-checkbox">
    <span class="list__item-description" contenteditable="true">${input.value}</span>
    <button class="remove-button">Remove</button>
  `;
  ul.appendChild(li);
  input.value = '';

  const removeButton = document.querySelectorAll('.remove-button');
  removeButton.forEach((button) => button.addEventListener('click', removeTask));
  const checkbox = document.querySelectorAll('.list__item-checkbox');
  checkbox.forEach((box) => box.addEventListener('click', isCompleted));
  const clearAllButton = document.querySelector('.main__anchor');
  clearAllButton.addEventListener('click', clearAllCompleted);
  const descriptionSpan = document.querySelectorAll('.list__item-description');
  descriptionSpan.forEach((item) => {
    item.addEventListener('input', updateLocalStorage);
  });

  tasks.push(taskObject);

  tasks.forEach((task, index) => {
    task.index = index;
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export default addTasks;
