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
        form.querySelector('.add-btn').disabled = true;
        tasks.push({text: value, disabled: false});
        localStorage.todo = JSON.stringify(tasks);
        renderListItem(formCont);
    }
    countTasks(formCont);
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
        tasks[li.id].disabled = !tasks[li.id].disabled
    }
    countTasks(formCont);

}

const handleCleanBtnClick = (ul) => {
    if (confirm('Вы действительно хотите удалить все дела?')) {
        tasks = [];
        ul.innerHTML = '';
    }
    countTasks(formCont);
}

document.addEventListener('DOMContentLoaded', () => {
    const {form, ul, cleanBtn} = createToDo(formCont);

    form.addEventListener('submit', handleFormSubmit);

    ul.addEventListener('click', handleBtnClick);
    cleanBtn.addEventListener('click', () => handleCleanBtnClick(ul));

    if (!localStorage.todo) {
        localStorage.setItem('todo', JSON.stringify(tasks));
    }
    else {
        tasks = JSON.parse(localStorage.todo);
    }

    renderListItem(formCont);
    countTasks(formCont);
});