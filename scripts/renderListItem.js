import { createListItem } from "./createElement.js";
import { getPosts, patchPost, deletePost } from './contrl.js';

const renderListItem = async (cont) => {

    const ul = cont.querySelector('ul');
    ul.innerHTML = '';
    
    const tasks = await getPosts();

    for (const item of tasks) {
        const li = createListItem(item.name);
        li.id = item.id;

        if (item.done) {
            li.classList.add('li-active');
        }

        const [statusBtn, deleteBtn] = li.querySelector('.buttons').children;
        
        statusBtn.addEventListener('click', () => {
            li.classList.toggle('li-active');
            patchPost({name: item.name, owner: item.owner, done: !item.done}, item.id);
        });
    
        deleteBtn.addEventListener('click', () => {
            if (confirm('Вы действительно хотите удалить задачу?')) {
                li.remove();
                deletePost(li.id);
            }
        });
        
        ul.insertBefore(li, ul.firstChild);
    }

    countTasks(cont);
}

const countTasks = (cont) => {
    const [total, done] = cont.querySelector('.footer-text').children;
    total.textContent = `Кол-во дел: ${cont.querySelectorAll('.task-item').length}`;
    done.textContent = `Выполнено: ${cont.querySelectorAll('.li-active').length}`;
}

export {renderListItem, countTasks};