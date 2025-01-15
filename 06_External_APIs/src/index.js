//! Global Variables
let baseUrl = "https://api.tvmaze.com/search/shows?q="
const spotlightContainer = document.querySelector("#spotlight")
const searchInput = document.querySelector("#search-input")
const spotlightName = document.querySelector("#show-name")
const spotlightImg = document.querySelector("#show-image")
const spotlightGenres = document.querySelector("#show-genres")
const spotlightRuntime = document.querySelector("#show-runtime")
const spotlightRating = document.querySelector("#show-rating")
const spotlightSummary = document.querySelector("#show-summary")
const showResults = document.querySelector("#show-results")
const notificationBanner = document.querySelector("#notification")
console.log(secretKey)
//! Helper Functions
const displayError = () => {
    notificationBanner.innerText = "There was a problem with the search"
    setTimeout(() => {
        notificationBanner.innerText = ""
    }, 5000)
}

const resetShowDetails = () => {
    debugger
        spotlightContainer.innerHTML = `
            <h2 id="show-name"></h2>
            <img src="" alt="" id="show-image">
            <span id="show-genres"></span>
            <span id="show-runtime"></span>
            <span id="show-rating"></span>
            <p id="show-summary"></p>
        `
}

const displaySelectedShowDetails = (showObj) => {
    spotlightName.innerText = showObj.show.name
    spotlightImg.src = showObj.show?.image?.medium || showObj.show?.image?.original || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKdc2fBSuBZU-URFEIdlQqf19W1nEdO5NKpA&s"
    spotlightImg.alt = showObj.show.name
    spotlightGenres.innerText = showObj.show.genres.join(", ")
    spotlightRuntime.innerText = `${showObj.show.runtime || "Unknown"} minutes`
    spotlightRating.innerText = showObj.show.rating?.average ? `${showObj.show.rating?.average}/10` : "Unknown"
    // spotlightSummary.innerText = showObj.show.summary.replaceAll("<p>", "").replaceAll("</p>", "")
    spotlightSummary.innerHTML = showObj.show.summary
}

const displayShowResult = (showObj) => {
    //! Create the container for the show result -> div
    const div = document.createElement("div")
    div.dataset.id = showObj.show.id
    div.className = "result-card"
    //! Create a header for the show title -> h2/h3
    const h2 = document.createElement("h2")
    h2.innerText = showObj.show.name
    h2.className = "result-title"
    //! create an img tag to display the image
    const img = document.createElement("img")
    img.src = showObj.show?.image?.medium || showObj.show?.image?.original || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKdc2fBSuBZU-URFEIdlQqf19W1nEdO5NKpA&s"
    img.className = "result-image"
    //! Attach the mouseenter and mouseleave events onto the whole card
    div.addEventListener("mouseover", () => displaySelectedShowDetails(showObj)) //! CALLBCK VS CALLNOW!!!!
    // div.addEventListener("mouseout", resetShowDetails) //! CALLBCK VS CALLNOW!!!!
    //! Append the child elements inside the container
    div.append(h2, img)
    //! Append the container onto the DOM
    showResults.append(div)
}

const handleSearch = async (e) => {
    //! 1. add a try..catch for best practices with async/await
    try {
        //! 2. Extract what was typed out of the input
        const searchQuery = e.target.value.trim()
        if (!searchQuery) {
            resetShowDetails()
        }
        //! 3. Fire a GET fetch call using the baseUrl + the searchQuery
        const response = await fetch(`${baseUrl}${searchQuery}`)
        //! 4. Extract the data in JSOn notation out of the Response body
        const data = await response.json()
        //! 5. Account for Responses that are fulfilled BUT with a not OK status
        if (!response.ok) {
            // debugger
            displayError()
        }
        //! CLEAR THE RESULT SECTION BEFORE APPENDING NEW RESULTS
        showResults.innerHTML = ""
        //! Go ahead and append the results
        data.forEach(showObj => displayShowResult(showObj))

    } catch (error) {
        displayError()
    }
}

//! Attach Listeners
searchInput.addEventListener("input", handleSearch)

//! Invoke Logic