// script.js

// Run JavaScript ONLY after the HTML is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task to the list
    function addTask() {
        // Retrieve and trim the input value
        const taskText = taskInput.value.trim();

        // Alert if input is empty
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create new task list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove the list item when the button is clicked
        removeBtn.onclick = function () {
            taskList.removeChild(listItem);
        };

        // Append remove button and list item to task list
        listItem.appendChild(removeBtn);
        taskList.appendChild(listItem);

        // Clear input field for next task
        taskInput.value = '';
    }

    // Add task on button click
    addButton.addEventListener('click', addTask);

    // Add task on Enter key press
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Trigger once on page load (allows any default tasks in future)
    addTask();
});
