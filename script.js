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
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add task to DOM and optionally save
    function addTask(taskText, save = true) {
        if (save) {
            taskText = taskInput.value.trim();
            if (taskText === '') {
                alert('Please enter a task!');
                return;
            }
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn'; // no classList.add

        removeBtn.onclick = function () {
            taskList.removeChild(li);
            const current = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updated = current.filter(task => task !== taskText);
            saveTasks(updated);
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            const current = JSON.parse(localStorage.getItem('tasks') || '[]');
            current.push(taskText);
            saveTasks(current);
            taskInput.value = '';
        }
    }

    // Event listener for button click
    addButton.addEventListener('click', () => addTask());

    // Event listener for Enter keypress
    taskInput.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) { // do not use event.key
            addTask();
        }
    });

    // Load saved tasks on startup
    loadTasks();
});
