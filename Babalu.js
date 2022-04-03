/**
 * Alison C.
 *
 * April 1st, 2022
 *
 * PF Assignment: create an encoder and decoder that takes a text file as input
 * #### Instructions to use this code ####
* 1. The coder function is textToBarcode(), which takes a LIST as arg.
*    Therefore, you need to take a string object and convert it to a list before using this function
* 2. The decoder function (Lubaba.js) is barcodeToText(), which takes a string of barcode as its arg
* 3. "barcode" & and "anyText" are Plug & Play instances to be used in the barcodeToText() and textToBarcode()
* respectively for testing purpose
 *
 * UNIVERSIDADE FEDERAL DE SERGIPE, São Cristóvão - SE
* */

const fs = require('fs')
const path = require('path')

const filePathText = path.join(__dirname, 'randomText.txt')
const randomText = fs.readFileSync(filePathText)

// Create a function that converts text to a list of characters (including spaces)
const randomTextToList = randomText.toString().split("")

// Create a function that converts a char to binary
// https://javascript.plainenglish.io/how-to-convert-from-binary-to-text-in-javascript-3e881c7fd8c7
const charToBinary = (chr) => (chr.charCodeAt(0) + 350).toString(2)

// Fn1: Create a function that converts all chars from text to its binary variants
const textToBinary = (list) => list.map((chr) => charToBinary(chr))

// Create a function that given a string of binary code transforms it to barcode
function binStringToBar(binStr){
    return binStr.split("").map((bin) =>{
        if (bin === "0")
            return "█"
        else
            return "│"
    })
        .reverse()
        .reduce((acc, bar) => bar.concat(acc), '')
}
// Fn2: Create a function that converts a list of binary strings to barcode strings
const binListToBarcode = (list) =>
    list.map((binStr) => binStringToBar(binStr) + " ")
        .reverse()
        .reduce((acc, barcode) => barcode.concat(acc), '')

// Create a composed function that converts text to binary & another that converts a binary list to barcode
const binComposition = (...fns) => (list) => fns.reduce((acc, fn) => fn(acc), list)
// CODER --------------------------------------------------------------
const textToBarcode = binComposition(textToBinary, binListToBarcode)

// Create a function to write barcode to a txt file
// https://www.codegrepper.com/code-examples/javascript/javascript+write+to+text+file
const barcodeContent = textToBarcode(randomTextToList)
fs.writeFile('barcodeForRandomText.txt', barcodeContent, err => {
    if (err) {
        console.error(err)
    }
})