
const createPost = (obj) => {

    fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
        
    
    .then(async (responce) => console.log(await responce.json()))
}



const getPosts = async () => {

    return fetch('http://localhost:3000/api/todos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((responce) => responce.json());

}


const getPostById = (id) => {
    
    fetch(`http://localhost:3000/api/todos/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    
    .then(async (responce) => console.log(await responce.json()))
}



const patchPost = (obj, id) => {

    fetch(`http://localhost:3000/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then(async (responce) => console.log(await responce.json()))

}


const deletePost = (id) => {

    fetch(`http://localhost:3000/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(async (responce) => console.log(await responce.json()))

}

export { createPost, getPosts, getPostById, patchPost, deletePost }