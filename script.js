const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Fonction qui ajoute une tâche
function addTask() {
    const toDoThings = newTaskInput.value.trim();
    if (toDoThings === '') return;

    // Création des éléments
    const item = document.createElement('li');
    item.textContent = toDoThings;

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';

    const checkBoxLabel = document.createElement('label');
    checkBoxLabel.textContent = '';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';

    // Assemblage des éléments
    item.appendChild(checkBox);
    item.appendChild(checkBoxLabel);
    item.appendChild(deleteButton);
    taskList.appendChild(item);

    // Gestion du checkbox
    checkBox.addEventListener('click', () => {
        item.classList.toggle('completed');
        if (item.classList.contains('completed')) {
            checkBoxLabel.textContent = ' Fait';
        } else {
            checkBoxLabel.textContent = '';
        }
        saveTasks(); // Enregistrer les tâches après chaque modification
    });

    // Gestion du bouton "Supprimer"
    deleteButton.addEventListener('click', () => {
        item.remove();
        saveTasks(); // Enregistrer après la suppression
    });

    // Vider le champ
    newTaskInput.value = '';

    // Sauvegarder dans localStorage
    saveTasks();
}

// Clic sur le bouton pour ajouter une tâche
addTaskButton.addEventListener('click', addTask);

// Appuie sur "Entrée"
newTaskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Sauvegarder toutes les tâches dans localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach((item) => {
        tasks.push({
            text: item.textContent.replace(' Fait', '').trim(),
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Enregistre les tâches
}

// Charger les tâches sauvegardées
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => {
        const item = document.createElement('li');
        item.textContent = task.text;

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = task.completed;

        const checkBoxLabel = document.createElement('label');
        checkBoxLabel.textContent = task.completed ? ' Fait' : '';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';

        item.appendChild(checkBox);
        item.appendChild(checkBoxLabel);
        item.appendChild(deleteButton);
        taskList.appendChild(item);

        checkBox.addEventListener('click', () => {
            item.classList.toggle('completed');
            if (item.classList.contains('completed')) {
                checkBoxLabel.textContent = ' Fait';
            } else {
                checkBoxLabel.textContent = '';
            }
            saveTasks(); // Enregistrer les tâches après modification
        });

        deleteButton.addEventListener('click', () => {
            item.remove();
            saveTasks(); // Enregistrer après la suppression
        });
    });
}

// Charger les tâches au démarrage
loadTasks();
