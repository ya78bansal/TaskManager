document.querySelectorAll('.new-card-btn').forEach(button => {
    button.addEventListener('click', () => {
        const taskName = prompt("Enter the name of the new task:");
        if (taskName) {
            const newCard = createCardElement(taskName);
            const Cards = button.nextElementSibling; // Find the .kanban-cards div
            Cards.appendChild(newCard);
        }
    });
});

document.querySelectorAll('.kanban-card').forEach(card => {
    card.addEventListener('dragstart', () => {
        card.classList.add('dragging');
    });

    card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
    });
});

document.querySelectorAll('.kanban-column').forEach(column => {
    column.addEventListener('dragover', event => {
        event.preventDefault();
        const draggingCard = document.querySelector('.dragging');
        const Cards = column.querySelector('.kanban-cards');
        const afterElement = getDragAfterElement(Cards, event.clientY);
        if (afterElement == null) {
            Cards.appendChild(draggingCard);
        } else {
            Cards.insertBefore(draggingCard, afterElement);
        }
    });
});

function createCardElement(taskName) {
    const newCard = document.createElement('div');
    newCard.className = 'kanban-card';
    newCard.draggable = true;

    const cardContent = document.createElement('span');
    cardContent.textContent = taskName;

    const cardOptions = document.createElement('div');
    cardOptions.className = 'card-options';

    const editButton = document.createElement('button');
    editButton.textContent = '✏️';
    editButton.addEventListener('click', () => {
        const newTaskName = prompt("Edit the task name:", taskName);
        if (newTaskName) {
            cardContent.textContent = newTaskName;
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '🗑️';
    deleteButton.addEventListener('click', () => {
        newCard.remove();
    });

    cardOptions.appendChild(editButton);
    cardOptions.appendChild(deleteButton);

    newCard.appendChild(cardContent);
    newCard.appendChild(cardOptions);

    // Add drag event listeners
    newCard.addEventListener('dragstart', () => {
        newCard.classList.add('dragging');
    });

    newCard.addEventListener('dragend', () => {
        newCard.classList.remove('dragging');
    });

    return newCard;
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.kanban-card:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}




