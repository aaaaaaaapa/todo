export const createElement = (elem, className, text='', name='', placeholder='') => {
    const element = document.createElement(elem);
    element.classList.add(className);
    element.textContent = text;
    if (elem === 'input') {
        element.name = name;
        element.placeholder = placeholder;
    }
    return element;

}


export const createTitle = (text='Список дел') => {
    return createElement('h1', 'header-text', text);
}


export const createForm = (placeholder='Введите текст...', text='Добавить') => {
    const form = createElement('form', 'task-form');
    const input = createElement('input', 'title-input', '', 'title', placeholder);
    const addBtn = createElement('button', 'add-btn', text);
    addBtn.disabled = true;

    input.oninput = () => {
        if (input.value.trim() === '') {
            addBtn.disabled = true;
        }
        else {
            addBtn.disabled = false;
        }
    }

    form.append(input, addBtn);

    return {
        form,
        input,
        addBtn
    };
}


export const createFooter = () => {
    const divFtr = createElement('div', 'footer');
    const divText = createElement('div', 'footer-text');
    const spanTotal = createElement('span', 'total', 'Кол-во дел: 0');
    const spanDone = createElement('span', 'total', 'Выполнено: 0');
    const cleanBtn = createElement('button', 'clean-btn', 'Очистить');

    divText.append(spanTotal, spanDone);
    divFtr.append(divText, cleanBtn);
    
    return {
        divFtr,
        cleanBtn
     };
}


export const createList = () => {
    const divList = createElement('div', 'tasks');
    const ul = createElement('ul', 'task-list');
    divList.append(ul);

    return {
        divList,
        ul
    }
}


export const createListItem = (text) => {

    const li = createElement('li', 'task-item');

    const span = createElement('span', 'task-text', text);
    const statusBtn = createElement('button', 'status-btn', 'Выполнено');
    const deleteBtn = createElement('button', 'delete-btn', 'Удалить');

    const divBtn = createElement('div', 'buttons');
    divBtn.append(statusBtn, deleteBtn);
    
    li.append(span, divBtn);
    return li;
}
