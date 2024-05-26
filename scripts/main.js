import { createToDo } from "./createToDo.js";
import { renderListItem, countTasks } from './renderListItem.js';
import { createPost } from "./contrl.js";

const formCont = document.querySelector('.form-container');


const handleFormSubmit = (event) => {

    const form = event.target;
    const value = form.title.value;

    event.preventDefault();

    if (value.trim() === '') {
        alert('Введите текст');
    }
    else {
        form.querySelector('.add-btn').disabled = true;
        createPost({name: value, owner: 1});
        renderListItem(formCont);
    }
    event.target.reset();
}


const handleCleanBtnClick = (ul) => {
    if (confirm('Вы действительно хотите удалить все дела?')) {
        ul.innerHTML = '';
    }
    countTasks(formCont);
}

document.addEventListener('DOMContentLoaded', () => {

    const {form, ul, cleanBtn} = createToDo(formCont);

    form.addEventListener('submit', handleFormSubmit);
    cleanBtn.addEventListener('click', () => handleCleanBtnClick(ul));

    renderListItem(formCont);

});