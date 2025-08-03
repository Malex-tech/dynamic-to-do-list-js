// Run JavaScript ONLY after the HTML is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false --> don’t save again to localStorage
    }

    // Save array of tasks to localStorage
    function saveTasksToLocalStorage(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add task to DOM (and optionally to localStorage)
    function addTask(taskText, save = true) {
        // When triggered by button/Enter key, get the input field value
        if (save) {
            taskText = taskInput.value.trim();
            if (taskText === '') {
                alert('Please enter a task!');
                return;
            }
        }

        // Create li element
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove task from both DOM and localStorage
        removeBtn.onclick = function () {
            taskList.removeChild(listItem);

            // Remove task from localStorage array
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = storedTasks.filter(task => task !== taskText);
            saveTasksToLocalStorage(updatedTasks);
        };

        listItem.appendChild(removeBtn);
        taskList.appendChild(listItem);

        // Save to localStorage if triggered by user-add action
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            saveTasksToLocalStorage(storedTasks);
            taskInput.value = '';
        }
    }

    // Add listeners
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initial load
    loadTasks();
});
