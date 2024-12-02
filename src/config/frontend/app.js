// frontend/app.js
document.getElementById('login-btn').addEventListener('click', function() {
    window.location.href = '/login';  // This can be replaced by a login form later
});

document.getElementById('signup-btn').addEventListener('click', function() {
    window.location.href = '/signup';  // This can be replaced by a signup form later
});

document.getElementById('add-task-btn').addEventListener('click', function() {
    window.location.href = '/add-task';  // A new page or modal to add tasks
});

// Function to fetch tasks and display them
function fetchTasks() {
    fetch('http://localhost:5000/api/tasks', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const tasksContainer = document.getElementById('tasks');
        tasksContainer.innerHTML = '';
        data.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task';
            taskDiv.innerHTML = `<h3>${task.title}</h3><p>${task.description}</p><p>Priority: ${task.priority}</p>`;
            tasksContainer.appendChild(taskDiv);
        });
    })
    .catch(err => console.error('Error fetching tasks:', err));
}

// Call the fetchTasks function when the page loads
window.onload = function() {
    fetchTasks();
};
