//! Suggestions When Working With the DOM

//TODO 1. Set global selector variables at the top of the file for everyone to use
//TODO 2. Attach event listeners to the correct DOM nodes
//TODO 3. Decide if creating the callback anonymously in-place OR pass a function reference (promotes reusability)
//TODO 4. Does the callback have access to all the data it needs or should it receive parameters?

const newBookButton = document.querySelector('#toggleForm')
// const newBookButtonFunc = () => document.querySelector('#toggleForm')
const bookForm = document.querySelector('#book-form')
const booksUl = document.querySelector('#book-list')
////////////////////////////////////////////////////////////////
// Wednesday's Code
////////////////////////////////////////////////////////////////

// console.log(bookStore);

function formatPrice(price) {
    return '$' + Number.parseFloat(price).toFixed(2);
}
function setHeader(bookStore) {
    const h1 = document.querySelector("#store-name")
    h1.innerText = bookStore.name
}
function changeFooter(bookStore) {
    const divName = document.getElementById("store")
    divName.innerText = bookStore.name
    const divAddress = document.getElementById("address")
    divAddress.innerText = bookStore.address
    const divNumber = document.getElementById("number")
    divNumber.innerText = bookStore.number
}
function addParagraph() {
    const p = document.createElement("p") // I just created a new orphan node
    p.innerText = "Something random!"
    p.id = "random"
    document.querySelector("main").appendChild(p)
    document.querySelector("main").append(p, "a string here", 7)
}
function removeEl() {
    const h1 = document.querySelector("div#header div h1")
    h1.remove()
}
function changeHeader() {
    const h1 = document.querySelector("div#header div h1")
    h1.innerText = "A new name"
}

const fillForm = (form, data) => {
    for (const key in data) { //! dynamically fill the form based on the data keys if the form has an input name property that matches
        if (form[key]) {
            form[key].value = data[key]
        }
    }
}

function renderBook(book) {
    const li = document.createElement("li")
    li.className = "list-li"

    const h3 = document.createElement("h3")
    h3.innerText = book.title

    const pAuthor = document.createElement("p")
    pAuthor.innerText = book.author

    const pPrice = document.createElement("p")
    pPrice.innerText = formatPrice(book.price)

    const img = document.createElement("img")
    img.src = book.imageUrl
    img.alt = book.title

    const editButton = document.createElement("button")
    editButton.innerText = "Edit"
    editButton.dataset.id = book.id
    editButton.addEventListener("click", e => {
        //! 1. expand the bookForm if collapsed
        bookForm.classList.remove("collapsed")
        //! 2. fill in the edit form with the book info
        // document.querySelector("#form-title").value = book.title //! SLOW but CORRECT way to do it
        fillForm(bookForm, book)
        //! 3. Adjust the submit button text
        bookForm.querySelector("input[type='submit']").value = "Update Book"
        //! 4. embed a little data-id onto the form to signal EVERYWHERE that this is a patch and what the id is
        bookForm.dataset.id = book.id
    })

    const button = document.createElement("button")
    button.innerText = "Delete"
    button.dataset.id = book.id
    button.addEventListener("click", e => {
        (async () => {
            try {
                const response = await fetch(`http://localhost:3000/books/${book.id}`, { method: "DELETE" })
                if (!response.ok) {
                    // const data = await response.json()
                    throw new Error("Failed to delete the book") //data)
                }
                // e.target.parentElement.remove() //! PESSIMISTIC APPROACH
            } catch (error) {
                alert(error.stack)
                ulList.appendChild(li)
            }
        })() //! I.I.F.E. used when a function is declared and used only ONCE immediately
        // fetchDeleteBook() // async function
        e.target.parentElement.remove() // sync code
    })

    li.append(h3, pAuthor, pPrice, img, editButton, button)
    // figure out where
    // target that place with querySelector/getElementById
    const ulList = document.getElementById("book-list")
    // append
    ulList.appendChild(li)
}

function renderBookAsHTML(book) {
    const ulList = document.getElementById("book-list")
    ulList.innerHTML += `
    <li class="list-li">
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <p>${formatPrice(book.price)}</p>
        <img src=${book.imageUrl} alt=${book.title}/>
        <button data-id=${book.id} class="delete-btn">Delete</button>
    </li>
    `
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", e => e.target.parentElement.remove())
    })
}

// setHeader()
// changeFooter()
// bookStore.inventory.forEach(bookObj => renderBookAsHTML(bookObj))
// bookStore.inventory.forEach(renderBook) this line leverages JS magic BUT IT'S IDENTICAL TO THE ONE ABOVE

////////////////////////////////////////////////////////////////
// Yesterday's Code
// Event Listeners/Handlers (Behavior => Data => Display)
////////////////////////////////////////////////////////////////
//! Generic Syntax For Attaching Event Listeners

// domNodeElement.addEventListener(theEventInStringformat, callbackFunctionThatDesidesWhatToDo)

//! Pattern 1: create the function somewhere to promote reusability
//! then pass the function as a callback to addEventListener
newBookButton.addEventListener('click', () => {
    bookForm.classList.toggle('collapsed')
})

//! Pattern 2: create the callback function in-place, make it anonymous, and IF YOU WANT use an arrow function for readability.

const handleSubmit = (e) => {
    e.preventDefault() //! This applies to both PATCH and POST requests
    if (!e.target.title.value.trim()) { //! This applies to both PATCH and POST requests
        alert("Title must be present!")
        return
    }

    //! I DO NOT KNOW if this is aUPDATE submit or a POST, so check the data-id onto the form
    const bookId = bookForm.dataset.id
    // how do I extract all of the info from the form -> e.target.NAMEATTRIBUTE.value
    // how do I build ONE object out of it
    const book = {
        id: bookId || uuid.v4().slice(0, 4), //! we dynamically handled the assignment of the id for both PATCH and POST scenarios
        title: e.target.title.value,
        author: e.target.author.value,
        price: Number(e.target.price.value),
        inventory: e.target.inventory.valueAsNumber,
        imageUrl: e.target.imageUrl.value,
    }
    if (bookId) {
        const updateBook = async () => { //! PESSIMISTIC APPROACH
            try {
                const response = await fetch(`http://localhost:3000/books/${bookId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json", //! specifies the data format in which WE SEND the data
                        Accept: "application/json",//! specifies the data format in which WE WANT TO RECEIVE the data from the server
                    },
                    body: JSON.stringify(book)
                })
                const data = await response.json()
                if (!response.ok) {
                    window.alert("The server could not process your request")
                    return
                }
                //! HOW DO I USE THE UPDATED BOOK???
                const liToUpdate = document.querySelector(`.list-li button[data-id="${bookId}"]`).parentNode
                liToUpdate.querySelector("h3").innerText = data.title
                liToUpdate.querySelector("p").innerText = data.author
                liToUpdate.querySelector("p:nth-child(3)").innerText = formatPrice(data.price)
                liToUpdate.querySelector("img").src = data.imageUrl
                liToUpdate.querySelector("img").alt = data.title
                // const createdBook = await response.json()
                e.target.reset() // EMPTY THE FORM
                bookForm.querySelector("input[type='submit']").value = "New Book"
            } catch (error) {
                window.alert("The server could not process your request")
            }
        }
        updateBook() //! invoke the function immediately -> refactor suggestion: IIFE??
    } else {
        const createBook = async () => {
            try {
                const response = await fetch("http://localhost:3000/books", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", //! specifies the data format in which WE SEND the data
                        Accept: "application/json",//! specifies the data format in which WE WANT TO RECEIVE the data from the server
                    },
                    body: JSON.stringify(book)
                })
                if (!response.ok) {
                    window.alert("The server could not process your request")
                    return
                }
                // const createdBook = await response.json()
                e.target.reset() // EMPTY THE FORM
            } catch (error) {
                window.alert("The server could not process your request")
                document.querySelector(`.list-li button[data-id='${book.id}']`).parentNode.remove()
            }
        }
        createBook() //! async function so it will take time!!!!
    
        renderBook(book) //! synchronous action, will run first!!!
    }
}

// bookForm.addEventListener('submit', e => handleSubmit(e, somethingElse))
bookForm.addEventListener('submit', handleSubmit)


////////////////////////////////////////////////////////////////\
//* FETCH LECTURE -> TODAY'S CODE
//! Access Data From the json-server and leverage the existing functions to make 
//! sure we still see the books and store details

const fetchData = async url => {
    try {
        const response = await fetch(url) //! the default method is GET
        const data = await response.json()
        return data
    } catch (error) {
        alert(error)
    }
}


//! Invoke the logic here
fetchData("http://localhost:3000/books")
    .then(books => books.forEach(bookObj => renderBook(bookObj)))
// .then(books => books.forEach(bookObj => renderBookAsHTML(bookObj)))
///////////////////////////////////////////////////////////////