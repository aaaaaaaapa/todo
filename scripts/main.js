import { createToDo } from "./createToDo.js";
import { renderListItem, countTasks } from './renderListItem.js'

const formCont = document.querySelector('.form-container');
let tasks = [
    {
        text: 'task1',
        disabled: false
    },
    {
        text: 'task2',
        disabled: false
    },
    {
        text: 'task3',
        disabled: true
    }
];

const handleFormSubmit = (event) => {

    const form = event.target;
    const value = form.title.value;

    event.preventDefault();

    if (value.trim() === '') {
        alert('Введите текст');
    }
    else {
        tasks.push({text: value, disabled: false});
        localStorage.todo = JSON.stringify(tasks);
        renderListItem(form);
    }

    event.target.reset();
}

const handleBtnClick = (event) => {

    const li = event.target.closest('li');

    if (event.target.classList.contains('delete-btn')) {
        if (confirm('Вы действительно хотите удалить задачу?')) {
            li.remove();
            tasks.splice(li.id, 1);
        }
    }
    else if (event.target.classList.contains('status-btn') || li) {
        li.classList.toggle('li-active');
        tasks[li.id] = {
            text: tasks[li.id].text, 
            disabled: !tasks[li.id].disabled
        };
    }

}

const handleCleanBtnClick = (form) => {
    if (confirm('Вы действительно хотите удалить все дела?')) {
        tasks = [];
        form.closest('div').querySelector('ul').innerHTML = '';
    }
}

export { handleBtnClick, handleFormSubmit, handleCleanBtnClick };

document.addEventListener('DOMContentLoaded', () => {
    const {form, ul, cleanBtn} = createToDo(formCont);

    form.addEventListener('submit', (event) => {
        handleFormSubmit(event, tasks);
        countTasks(event.target);
    }); 
    ul.addEventListener('click', handleBtnClick);
    cleanBtn.addEventListener('click', () => handleCleanBtnClick(form, tasks));

    if (!localStorage.todo) {
        localStorage.setItem('todo', JSON.stringify(tasks));
    }
    else {
        tasks = JSON.parse(localStorage.todo);
    }

    renderListItem(formCont.querySelector('form'));
    countTasks(formCont.querySelector('form'));
});

document.addEventListener('click', (event) => {
    if (event.target.closest('button') || event.target.closest('li')) {
        localStorage.todo = JSON.stringify(tasks);
        countTasks(formCont.querySelector('form'));
    }
})