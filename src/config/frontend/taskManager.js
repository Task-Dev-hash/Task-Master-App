// frontend/taskManager.js
function addTask(taskData) {
    fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(taskData)
    })
    .then(response => response.json())
    .then(data => console.log('Task added:', data))
    .catch(err => console.error('Error adding task:', err));
}
