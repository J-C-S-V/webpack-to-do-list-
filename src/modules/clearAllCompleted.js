function clearAllCompleted() {
  const tasks = (JSON.parse(localStorage.getItem('tasks'))) || [];

  const completedTasks = tasks.filter((task) => !task.completed);
  completedTasks.forEach((task, index) => {
    task.index = index;
  });

  localStorage.setItem('tasks', JSON.stringify(completedTasks));

  const completedItems = document.querySelectorAll('.completed');
  completedItems.forEach((item) => {
    item.remove();
  });
}

export default clearAllCompleted;
