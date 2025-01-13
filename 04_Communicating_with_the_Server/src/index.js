//! Suggestions When Working With the DOM

//TODO 1. Set global selector variables at the top of the file for everyone to use
//TODO 2. Attach event listeners to the correct DOM nodes
//TODO 3. Decide if creating the callback anonymously in-place OR pass a function reference (promotes reusability)
//TODO 4. Does the callback have access to all the data it needs or should it receive parameters?

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
function removeEl(){
    const h1 = document.querySelector("div#header div h1")
    h1.remove()
}
function changeHeader() {
    const h1 = document.querySelector("div#header div h1")
    h1.innerText = "A new name"
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
    const button = document.createElement("button")
    button.innerText = "Delete"
    button.dataset.id = book.id
    button.addEventListener("click", e => e.target.parentElement.remove())
    li.append(h3, pAuthor, pPrice, img, button)
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

const newBookButton = document.querySelector('#toggleForm')
// const newBookButtonFunc = () => document.querySelector('#toggleForm')
const bookForm = document.querySelector('#book-form')
const booksUl = document.querySelector('#book-list')

//! Pattern 1: create the function somewhere to promote reusability
//! then pass the function as a callback to addEventListener
newBookButton.addEventListener('click', () => {
    bookForm.classList.toggle('collapsed')
})

//! Pattern 2: create the callback function in-place, make it anonymous, and IF YOU WANT use an arrow function for readability.

const handleSubmit = (e) => {
    e.preventDefault()
    if (!e.target.title.value.trim()) {
        alert("Title must be present!")
        return
    }
    // how do I extract all of the info from the form -> e.target.NAMEATTRIBUTE.value
    // how do I build ONE object out of it
    const newBook = {
        id: uuid.v4().slice(0, 4),
        title: e.target.title.value,
        author: e.target.author.value,
        price: Number(e.target.price.value),
        inventory: e.target.inventory.valueAsNumber,
        imageUrl: e.target.imageUrl.value,
    }

    const createBook = async () => {
        try {
            const response = await fetch("http://localhost:3000/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", //! specifies the data format in which WE SEND the data
                    Accept: "application/json",//! specifies the data format in which WE WANT TO RECEIVE the data from the server
                },
                body: JSON.stringify(newBook)
            })
            if (!response.ok) {
                window.alert("The server could not process your request")
                return
            }
            // const createdBook = await response.json()
            e.target.reset() // EMPTY THE FORM
        } catch (error) {
            window.alert("The server could not process your request")
            document.querySelector(`.list-li button[data-id='${newBook.id}']`).parentNode.remove()
        }
    }
    createBook() //! async function so it will take time!!!!
    
    renderBook(newBook) //! synchronous action, will run first!!!
    // what do I do with the object
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