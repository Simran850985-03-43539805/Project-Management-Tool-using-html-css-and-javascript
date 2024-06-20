const projects = [];

function createProject() {
    const projectName = document.getElementById('project-name').value;
    if (projectName.trim() === '') {
        alert('Please enter a project name.');
        return;
    }

    const project = {
        id: projects.length + 1,
        name: projectName,
        tasks: []
    };

    projects.push(project);
    displayProjects();
    document.getElementById('project-name').value = '';
}

function addTask(projectId) {
    const taskName = prompt('Enter task name:');
    if (taskName.trim() === '') {
        alert('Task name cannot be empty.');
        return;
    }

    const project = projects.find(p => p.id === projectId);
    const task = {
        id: project.tasks.length + 1,
        name: taskName,
        comments: []
    };

    project.tasks.push(task);
    displayProjects();
}

function addComment(projectId, taskId) {
    const commentText = prompt('Enter your comment:');
    if (commentText.trim() === '') {
        alert('Comment cannot be empty.');
        return;
    }

    const project = projects.find(p => p.id === projectId);
    const task = project.tasks.find(t => t.id === taskId);
    const comment = {
        id: task.comments.length + 1,
        text: commentText
    };

    task.comments.push(comment);
    displayProjects();
}

function displayProjects() {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';

    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project';
        projectDiv.innerHTML = `
            <h3>${project.name}</h3>
            <button onclick="addTask(${project.id})">Add Task</button>
            <div class="tasks">
                ${project.tasks.map(task => `
                    <div class="task">
                        <h4>${task.name}</h4>
                        <button onclick="addComment(${project.id}, ${task.id})">Add Comment</button>
                        <div class="comments">
                            ${task.comments.map(comment => `
                                <div class="comment">
                                    <p>${comment.text}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        projectList.appendChild(projectDiv);
    });
}
