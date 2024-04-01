const createElement = (elem, className, text='', placeholder='') => {
    const element = document.createElement(elem);
    element.classList.add(className);
    element.textContent = text;
    if (elem === 'input') {
        element.placeholder = placeholder;
    }
    return element;
}

const createTitle = (text='Список дел') => {
    return createElement('h1', 'header-text', text);
}

const createForm = (placeholder='Введите текст...', text='Добавить') => {
    const form = createElement('form', 'task-form');
    const input = createElement('input', 'title-input', '', placeholder);
    const btn = createElement('button', 'add-btn', text);

    form.append(input, btn);

    return {
        form,
        input,
        btn
    };
}

const createList = () => {
    const divList = createElement('div', 'tasks');
    const ul = createElement('ul', 'task-list');
    divList.append(ul);
    return {
        divList,
        ul
    }
}

const createListItem = (text) => {

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
        const ul = document.querySelector('.task-list');
        const li = createListItem(value);
        ul.append(li);
    }
}

const handleFormSubmit = (event) => {
    event.preventDefault();
    addToList(event.target);
    event.target.reset();
}

const handleBtnClick = (event) => {
    const tg = event.target;
    const li = tg.closest('li');
    const [circle, text] = li.children[0].children;

    if (tg.classList.contains('delete-btn')) {
        li.remove();
    }
    else if (tg.classList.contains('status-btn') || li) {
        li.classList.toggle('li-active');
        circle.classList.toggle('circle-active');
        text.classList.toggle('text-line');
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const formCont = document.querySelector('.form-container');

    const h1 = createTitle();
    const {form} = createForm(); 
    const {divList, ul} = createList();

    formCont.append(h1, form, divList);

    form.addEventListener('submit', handleFormSubmit); 
    ul.addEventListener('click', handleBtnClick);
});