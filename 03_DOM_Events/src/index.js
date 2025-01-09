////////////////////////////////////////////////////////////////
// Yesterday's Code
////////////////////////////////////////////////////////////////

console.log(bookStore);

function formatPrice(price) {
    return '$' + Number.parseFloat(price).toFixed(2);
}
function setHeader() {
    const h1 = document.querySelector("#store-name")
    h1.innerText = bookStore.name
}
function changeFooter() {
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
    button.addEventListener("click", (e) => e.target.parentNode.remove())
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
    // const deleteBtn = document.querySelector(`li.list-li button[data-id="${book.id}"]`)
    // deleteBtn.addEventListener("click", (e) => e.target.parentNode.remove())
}


setHeader()
changeFooter()
bookStore.inventory.forEach(bookObj => renderBook(bookObj))
document.querySelectorAll("li.list-li button").forEach(btn => btn.addEventListener("click", (e) => e.target.parentNode.remove()))
// bookStore.inventory.forEach(renderBook) this line leverages JS magic 
// BUT IT'S IDENTICAL TO THE ONE ABOVE

////////////////////////////////////////////////////////////////
// Today's Code
// Event Listeners/Handlers (Behavior => Data => Display)
////////////////////////////////////////////////////////////////
//! Generic Syntax For Attaching Event Listeners

// domNodeElement.addEventListener(theEventInStringformat, callbackFunctionThatDesidesWhatToDo, optionalTrueBooleanHere)

//! Suggestions When Working With the DOM

//TODO 1. Set global selector variables at the top of the file for everyone to use
const toggleButton = document.querySelector("#toggleForm")
const bookForm = document.querySelector("#book-form")
// const handleClickToggle = () => {}
//TODO 2. Attach event listeners to the correct DOM nodes
// toggleButton.addEventListener("click", (e) => bookForm.classList.toggle("collapsed"))
toggleButton.addEventListener("click", (e) => e.target.nextElementSibling.classList.toggle("collapsed"))

bookForm.addEventListener("submit", (e) => {
    //! The first step is always to PREVENT PAGE REFRESHES!!!!!
    e.preventDefault()
    //! Extract the data out of the form and create a new object to contain the data!!
    const newBook = {
        title: document.querySelector("#form-title").value,
        author: document.querySelector("#form-author").value,
        price: parseFloat(document.querySelector("#form-price").value) || 0,
        imageUrl: document.querySelector("#form-imageUrl").value,
        inventory: parseInt(document.querySelector("#form-inventory").value) || 0,
    }
    //! VALIDATE THE INFORMATION BEFORE USING IT!!!!
    
    //! Use the book however you see fit!
    renderBook(newBook)
    
    //! ON SUCCESS, reset the form
    e.target.reset()
})
//TODO 3. Decide if creating the callback anonymously in-place OR pass a function reference (promotes reusability)
//TODO 4. Does the callback have access to all the data it needs or should it receive parameters?


//! Pattern 1: create the function somewhere to promote reusability
  // then pass the function as a callback to addEventListener

//! Pattern 2: create the callback function in-place, make it anonymous, and 
  // IF YOU WANT use an arrow function for readability.


