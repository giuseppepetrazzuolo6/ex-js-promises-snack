/*🏆 Snack 1
Ottieni il titolo di un post con una Promise.
Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise
che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}*/

function getPostTitle(id) {
    return new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/posts/${id}`)
            .then(resp => resp.json())
            .then(post => resolve(post.title))
            .catch(reject)

    })
}

getPostTitle(1)
    .then(result => console.log(result))
    .catch(err => console.error(err))

getPostTitle(2)
    .then(result => console.log(result))
    .catch(err => console.error(err))

getPostTitle(3)
    .then(result => console.log(result))
    .catch(err => console.error(err))

/*🎯 Bonus: Ottieni l'intero post con l'autore
Crea una funzione getPost(id) che recupera l'intero post. 
Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore, 
recuperati dalla chiamata https://dummyjson.com/users/{post.userId}.*/

function getPostId(id) {
    return new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/posts/${id}`)
            .then(resp => resp.json())
            .then(post => {
                fetch(`https://dummyjson.com/users/${post.userId}`)
                    .then(respons => respons.json())
                    .then(user => {
                        post.user = user
                        resolve(post)
                    })
                    .catch(reject)
            })
            .catch(reject)
    })
}

getPostId(5)
    .then(result => console.log(result))
    .catch(err => console.error(err))

/*🏆 Snack 2
Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, 
genera un numero casuale tra 1 e 6. Tuttavia, nel 20% dei casi, il dado si "incastra" e 
la Promise va in reject.*/

function lanciaDado() {
    return new Promise((resolve, reject) => {
        console.log('sto lanciando il dado...')
        setTimeout(() => {
            const Incastrato = Math.random() < 0.2
            if (Incastrato) {
                reject('il dado si è incastrato, riprova.')
            } else {
                const risultato = Math.floor(Math.random() * 6) + 1
                resolve(risultato)
            }
        }, 3000)
    })
}

lanciaDado()
    .then(result => console.log('il dado ha lanciato:', result))
    .catch(err => console.error(err));


/*🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato. 
Se il numero esce due volte di fila, stampa "Incredibile!"*/