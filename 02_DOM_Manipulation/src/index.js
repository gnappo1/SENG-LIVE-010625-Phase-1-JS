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
//* querySelector => 
//* getElementById =>
//! Multiple elements
//* querySelectorAll => 
//* getElementByClassName =>
//* getElementByTagName =>

//! Node Properties
//* innerText => 
//* textContent =>
//* innerHTML =>
//* className =>
//* classList =>
//* id => 

//! Node Relationship Properties
//* children
//* lastChild
//* firstChild
//* parentNode / parentElement
//* previousSibling / previousElementSibling
//* nextSibling / nextElementSibling

//! Create Retrieve Update Destroy (CRUD) Methods
//* createElement('tag')
//* prepend(elements)
//* append(elements)
//* appendChild(newElement)
//* removeChild(childElement)
//* insetAdjacentElement(position, newElement)

// TODO CRUD

// TODO 💡 Create a new DOM element of your choice and add it to the page

// TODO 💡 Create a function that sets the text content of the header to the bookstore name.

// TODO 💡 Create a function that grabs all the divs from the footer and render the bookstore name, address, and hours

// TODO 💡 Remove an element of your choice from the DOM


// TODO 💡 Exercise After Break
// create a function called renderBook(book)
// it will take a book object as an argument
// and create the html structure for rendering 
// that book and insert it into our webpage!