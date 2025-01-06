//! JS Fundamentals Part 1
//"use strict" // use to enforce a stricter set of rules and best-practices


//TODO Commenting Code
// Toggle comments using cmd + ? (mac) OR cntr + ? (pc)
// Single Line Comments
/*
    Multi Line Comments
*/

//TODO Console Logging
// console.log("test")
// console.warn("warn")
// console.error("error")

//TODO Debugging
//! VSC debugger, play button with the little bug
//! Add a breakpoint by clicking on the left of the line number
//! or use the debugger keyword when working in the browser

//TODO Data Types
//! check in REPL using typeof -> typeof true
//! Primitive
// number
// string
// boolean (true, false)
// null
// undefined
// symbol

//! Structural/Object
// object

//! Special 
// function

//TODO Truthiness and Falseness
// false, null, 0, -0, 0n, "", undefined, NaN

//TODO Variables
// let -> redeclaration is NOT possible; reassignment is possible
// const -> redeclaration is NOT possible; reassignment is NOT possible -> it does NOT mean it's CONSTANT because if I use arrays or objects I can modify the content stored in that memory location BUT NOT CHANGE the memory location itself
// var -> redeclaration is possible; reassignment is possible

let favoriteFood = "mac & cheese"
const favoriteDrink = "coffee"
var favoriteDessert = "brownies"
name = "super evil!" // implicit global prohibited under strict mode!!!!

//TODO String Interpolation VS Concatenation
// console.log("I am Matteo, and my favorite food is " + favoriteFood)
// console.log(`I am Matteo, and my favorite food is ${favoriteFood}`)

//TODO Conditional Statements
// 1. if/else if/else
// if (favoriteFood === "lasagna") {
//     console.log("This must be an Italian!")
// } else if (favoriteFood === "mac & cheese") {
//     console.log("This must be an American!")
// } else {
//     console.log("ORIGIN UNKNOWN")
// }

// 2. Switch Statements
// switch (favoriteFood) {
//     case "lasagna":
//         console.log("This must be an Italian!")
//         break;
//     case "mac & cheese":
//         console.log("This must be an American!")
//         break;

//     default:
//         console.log("ORIGIN UNKNOWN")
        // break;
// }
//TODO Ternary Expressions
// condition ? do something if truthy : do something if falsey
favoriteFood === "lasagna" ? console.log("You are Italian!") : console.log("You are not Italian")

//TODO Loops
// 1. While

// 2. For loop