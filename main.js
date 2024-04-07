let counter = localStorage.length ? Math.max(...Object.keys(localStorage)) : 0;
const formCont = document.querySelector('.form-container');

const createElement = (elem, className, text='', name='', placeholder='') => {
    const element = document.createElement(elem);
    element.classList.add(className);
    element.textContent = text;
    if (elem === 'input') {
        element.name = name;
        element.placeholder = placeholder;
    }
    return element;
}

const createTitle = (text='Список дел') => {
    return createElement('h1', 'header-text', text);
}

const createForm = (placeholder='Введите текст...', text='Добавить') => {
    const form = createElement('form', 'task-form');
    const input = createElement('input', 'title-input', '', 'title', placeholder);
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

const createFooter = (form) => {
    const divFtr = createElement('div', 'footer');
    const divText = createElement('div', 'footer-text');
    const spanTotal = createElement('span', 'total', 'Кол-во дел: 0');
    const spanDone = createElement('span', 'total', 'Выполнено: 0');
    const btn = createElement('button', 'clean-btn', 'Очистить');

    btn.onclick = () => {
        if (confirm('Вы действительно хотите удалить все дела?')) {
            localStorage.clear();
            form.closest('div').querySelector('ul').innerHTML = '';
        }
    }

    divText.append(spanTotal, spanDone);
    divFtr.append(divText, btn);
    return divFtr;
}

const createListItem = (text) => {

    const li = createElement('li', 'task-item');

    const span = createElement('span', 'task-text', text);
    const statusBtn = createElement('button', 'status-btn', 'Выполнено');
    const deleteBtn = createElement('button', 'delete-btn', 'Удалить');

    const divBtn = createElement('div', 'buttons');
    divBtn.append(statusBtn, deleteBtn);
    
    li.append(span, divBtn);
    return li;
}

const renderListItem = (form) => {

    const ul = form.closest('div').querySelector('ul');
    const keys = Object.keys(localStorage).sort((a, b) => {
        return a - b
    });

    for (const key of keys) {
        if (!(document.getElementById(key))) {
            const item = JSON.parse(localStorage[key]);
            const li = createListItem(item.text);
            li.id = key;
            if (item.disabled) {
                li.classList.add('li-active');
            }
            ul.insertBefore(li, ul.firstChild);
        }
    }
}

const countTasks = (form) => {
    const [total, done] = form.closest('div').querySelector('.footer-text').children;
    total.textContent = `Кол-во дел: ${localStorage.length}`;
    done.textContent = `Выполнено: ${form.closest('div').querySelectorAll('.li-active').length}`;
}

const handleFormSubmit = (event) => {

    const form = event.target;
    const value = form.title.value;

    event.preventDefault();

    if (value.trim() === '') {
        alert('Введите текст');
    }
    else {
        counter++;
        localStorage[counter] = JSON.stringify({text: value, disabled: false});
        renderListItem(event.target);
    }

    event.target.reset();
}

const handleBtnClick = (event) => {

    const li = event.target.closest('li');

    if (event.target.classList.contains('delete-btn')) {
        if (confirm('Вы действительно хотите удалить задачу?')) {
            localStorage.removeItem(li.id);
            li.remove();
        }
    }
    else if (event.target.classList.contains('status-btn') || li) {
        li.classList.toggle('li-active');
        localStorage[li.id] = JSON.stringify({
            text: JSON.parse(localStorage[li.id]).text, 
            disabled: !JSON.parse(localStorage[li.id]).disabled
        });
    }

}

const createToDo = (cont) => {
    const h1 = createTitle();
    const {form} = createForm(); 
    const {divList, ul} = createList();
    const divFtr = createFooter(cont);

    cont.append(h1, form, divList, divFtr);

    form.addEventListener('submit', (event) => {
        handleFormSubmit(event);
        countTasks(event.target);
    }); 
    ul.addEventListener('click', handleBtnClick);
    renderListItem(form);
}

document.addEventListener('DOMContentLoaded', () => {
    createToDo(formCont);
    countTasks(formCont.querySelector('form'));
});

document.addEventListener('click', (event) => {
    if (event.target.closest('button') || event.target.closest('li')) {
        countTasks(formCont.querySelector('form'));
    }
})