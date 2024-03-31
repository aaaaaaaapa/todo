const taskForm = document.querySelector('.task-form');
const taskList = document.querySelector('.task-list');


const createElement = (elem, className, text='') => {
    const element = document.createElement(elem);
    element.classList.add(className);
    element.textContent = text;
    return element;
}

const createAndAppendToListItem = (text) => {

    const li = createElement('li', 'task-item');

    const circle = createElement('div', 'circle');
    const span = createElement('span', 'ts-text', text);
    const statusBtn = createElement('button', 'status-btn', 'Выполнено');
    const deleteBtn = createElement('button', 'delete-btn', 'Удалить');

    const divText = createElement('div', 'task-text');
    divText.append(circle, span);
    const divBtn = createElement('div', 'buttons');
    divBtn.append(statusBtn, deleteBtn);
    
    li.append(divText, divBtn);
    return li;

}

const addToList = (form) => {

    const value = form.elements[0].value;

    if (value.trim() === '') {
        alert('Введите текст');
    }
    else {
        const li = createAndAppendToListItem(value);
        taskList.append(li);
    }

}

const handleFormSubmit = (event) => {
    event.preventDefault();
    addToList(event.target)
    event.target.reset()
}

const handleBtnClick = (event) => {
    const tg = event.target;
    const li = tg.closest('li');
    console.log(taskList.children[li])

    if (tg.classList.contains('status-btn') || tg === li) {
        li.classList.toggle('active');
    }
    else if (tg.classList.contains('delete-btn')) {
        taskList.remove(li);
    }
}

taskForm.addEventListener('submit', handleFormSubmit);
taskForm.addEventListener('keydown', function(e) {
    if (e.key === 13) {
        handleFormSubmit()
    }
});

taskList.addEventListener('click', handleBtnClick);