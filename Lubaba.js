const fs = require('fs')
const path = require('path')

const filePathBarcode = path.join(__dirname, 'barcodeForRandomText.txt')
const barcodeForRandomText = fs.readFileSync(filePathBarcode).toString()

// Create a function that given a piece of barcode returns the binary string for it
const barToBin = (str) => {
    let splitStr = str.split("")
    return splitStr.map((bar) => {
        if (bar === "█")
            return "0"
        else
            return "1"
    })  .reverse()
        .reduce((acc, bin) => bin.concat(acc), '')
}
// Create a function that given a barcode, creates a list of binary entries
const barcodeToBinList = (str) => str.split(" ").map((barStr) => barToBin(barStr))

// Create a function that given a barcode string returns the text for them
// DECODER --------------------------------------------------------------
const barcodeToText = (str) => barcodeToBinList(str)
    .map((elem) => String.fromCharCode(parseInt(elem, 2) - 350))
    .reverse()
    .reduce((acc, code) => code.concat(acc), '')

// console.log(barcodeToText(barcodeForRandomText))