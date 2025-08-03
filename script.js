// Run JavaScript ONLY after the HTML is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Save updated array to localStorage
    function saveTasksToLocalStorage(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add a task to DOM (and optionally save to localStorage)
    function addTask(taskText, save = true) {
        if (save) {
            taskText = taskInput.value.trim();
            if (taskText === '') {
                alert('Please enter a task!');
                return;
            }
        }

        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';  // using className, not classList.add

        removeBtn.onclick = function () {
            taskList.removeChild(listItem);
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = storedTasks.filter(task => task !== taskText);
            saveTasksToLocalStorage(updatedTasks);
        };

        listItem.appendChild(removeBtn);
        taskList.appendChild(listItem);

        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            saveTasksToLocalStorage(storedTasks);
            taskInput.value = '';
        }
    }

    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // initialize
    loadTasks();
});
