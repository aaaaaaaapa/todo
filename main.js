const taskForm = document.querySelector('.task-form');
const taskList = document.querySelector('.task-list');


const createTaskText = (value) => {

    const divText = document.createElement('div');
    divText.classList.add('task-text');

    const circle = document.createElement('div');
    circle.classList.add('circle');

    const span = document.createElement('span');
    span.classList.add('ts-text');
    span.innerText = value;

    divText.append(circle, span);
    return divText;

}

const createButtons = () => {

}

const createListItem = (value) => {

    const li = document.createElement('li');
    li.classList.add('task-item');

    const divText = createTaskText(value);
    
    li.append(divText);
    return li;

}

const addToList = (form) => {

    const value = form.elements[0].value;

    if (value.trim() === '') {
        alert('Введите текст');
    }
    else {
        const li = createListItem(value);
        taskList.append(li);
    }

}

const handleFormSubmit = (event) => {

    event.preventDefault();
    addToList(event.target)
    event.target.reset()

}

taskForm.addEventListener('submit', handleFormSubmit);
taskForm.addEventListener('keydown', function(e) {
    if (e.key === 13) {
        handleFormSubmit()
    }
});