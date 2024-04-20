import { createTitle, createForm, createFooter, createList } from './createElement.js';

export const createToDo = (cont) => {
    const h1 = createTitle();
    const {form} = createForm(); 
    const {divList, ul} = createList();
    const {divFtr, cleanBtn} = createFooter();

    cont.append(h1, form, divList, divFtr);

    return {form, ul, divFtr, cleanBtn};
}