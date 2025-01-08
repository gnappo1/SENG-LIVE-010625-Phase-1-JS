//* BookStore has been moved to data.js
console.log(bookStore);

//* Code from previous lecture

function formatPrice(price) {
  return '$' + parseFloat(price).toFixed(2);
}

//* New code starts here

//* Concepts
//! DOM Targeting

//! Single Element
//* querySelector => target by any property
// document.querySelector("#store-name") //! NOTICE THE #
//* getElementById => target by id only
// document.getElementById("store-name")


//! Multiple elements
//* querySelectorAll => document.querySelectorAll(".footer-info") => returns a NodeList (only forEach is available )
//* getElementByClassName => document.getElementsByClassName("footer-info") => returns a HTMLCollection (iterators are not available)
//* getElementByTagName => document.getElementsByTagName("div") => returns a HTMLCollection (iterators are not available)
//! if you don't like the limitations of these array-like structures, then turn them into an array using Array.from("collection to modify")

//! Node Properties
//* innerText => gets the text inside an element, aware of style
//* textContent => gets the text inside an element, unaware of style, and it will include <style> and <script>
//* innerHTML => gets the entire HTML structure (including tags) and it's safe when used to empty a section of the page or quickly populate a section with pre-existing data
//* className => accesses the className of the element and lets you reset it
//* classList => accesses all the classNames in a array-like structure and exposes the methods: add(), remove(), toggle()
//* id => accesses the id of the element and lets you reset it

//! Node Relationship Properties
//* children
//* lastChild
//* firstChild
//* parentNode / parentElement
//* previousSibling / previousElementSibling
//* nextSibling / nextElementSibling

//! Create Retrieve Update Destroy (CRUD) Methods
//* createElement('tag') -> THE WAY to create a new Element Node, just specify the type of element you're interested into
//* prepend(elements) -> adds any kind of element(s) to the beginning inside the targeted node (as a child)
//* append(elements) -> adds any kind of element(s) to the end inside the targeted node (as a child)
//* appendChild(newElement) -> adds ONE Node element to the end inside the targeted node (as a child)
//* removeChild(childElement) -> removes a child Node from the targeted parentNode
//* insertAdjacentElement(position, newElement)

// TODO CRUD
//! Globals
const storeHeader = document.querySelector("#store-name") //! captures the Node and never forgets about it
// const storeHeader = () => document.querySelector("#store-name") //! tries to target the Node at the time of invocation
const footerName = document.querySelector("#name")
const footerNumber = document.querySelector("#number")
const footerAddress = document.querySelector("#address")
const booksUl = document.querySelector("#book-list")
// TODO 💡 Create a new DOM element of your choice and add it to the page

// TODO 💡 Create a function that sets the text content of the header to the bookstore name.
function setStoreName() {
  storeHeader.innerText = bookStore.name
}
setStoreName();

// TODO 💡 Create a function that grabs all the divs from the footer and render the bookstore name, address, and hours
(function setFooterDetails() {
  footerName.innerText = bookStore.name
  footerNumber.innerText = bookStore.number
  footerAddress.innerText = bookStore.address
})()

// TODO 💡 Remove an element of your choice from the DOM
// storeHeader.remove()

// TODO 💡 Exercise After Break
// create a function called renderBook(book)
// it will take a book object as an argument
// and create the html structure for rendering 
// that book and insert it into our webpage!

function renderBook(bookObj) {
  const li = document.createElement("li")
  li.className = "list-li"
  // li.setAttribute("class", "list-li")
  const h3 = document.createElement("h3")
  h3.innerText = bookObj.title

  const pAuthor = document.createElement("p")
  pAuthor.innerText = bookObj.author

  const pPrice = document.createElement("p")
  pPrice.innerText = formatPrice(bookObj.price)

  const img = document.createElement("img")
  img.src = bookObj.imageUrl
  img.alt = bookObj.title

  const btn = document.createElement("button")
  btn.innerText = "Delete"

  li.append(h3, pAuthor, pPrice, img, btn)
  booksUl.appendChild(li)
}

function renderBookAsHTML(bookObj) {
  booksUl.innerHTML += `
    <li class="list-li">
      <h3>${bookObj.title}</h3>
      <p>${bookObj.author}</p>
      <p>${formatPrice(bookObj.price)}</p>
      <img src=${bookObj.imageUrl} alt=${bookObj.title}/>
      <button>Delete</button>
    </li>
  `
}
// bookStore.inventory.forEach(bookObj => renderBook(bookObj))
bookStore.inventory.forEach(renderBookAsHTML)