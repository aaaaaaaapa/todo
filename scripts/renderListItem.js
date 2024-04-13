import { createListItem } from "./createElement.js";

const renderListItem = (form) => {

    const ul = form.closest('div').querySelector('ul');
    ul.innerHTML = '';
    const tasks = JSON.parse(localStorage.todo);

    for (const item of tasks) {
        const li = createListItem(item.text);
        li.id = tasks.indexOf(item);
        if (item.disabled) {
            li.classList.add('li-active');
        }
        ul.insertBefore(li, ul.firstChild);
    }
}

const countTasks = (form) => {
    const [total, done] = form.closest('div').querySelector('.footer-text').children;
    total.textContent = `Кол-во дел: ${JSON.parse(localStorage.todo).length}`;
    done.textContent = `Выполнено: ${form.closest('div').querySelectorAll('.li-active').length}`;
}

export {renderListItem, countTasks};