'use strict'

async function condensed_date(someday, base = 2014) {
    const somedayDate = new Date(someday)

    const year = somedayDate.getFullYear()
    const differenceFromBase = year - base
    const differenceFromBaseMultiplyBy = differenceFromBase * 372

    const monthMinusOne = somedayDate.getMonth()
    const monthMinusOneMultiplyBy = monthMinusOne * 31

    const day = somedayDate.getDate()
    const dayMinusOne = day - 1

    return differenceFromBaseMultiplyBy + monthMinusOneMultiplyBy + dayMinusOne
}

async function import_check_digit(amount) {
    amount=amount.replace(/\.|\$|\,/g,'')

    const array = [7,3,1]
    const amountArray = amount.split("")
    
    let result = 0
    let i = 0
    for (const number of amountArray.reverse()) {
        result = result + parseInt(number)*array[i]
        i = i + 1
        if(i==3){
            i=0
        }
    }

    return result % 10
}

async function reference_check_digits(someday, amount, reference,  base = 2014, freeDigit = 2) {
    const alphabet = {
        'A':1,
        'B':2,
        'C':3,
        'D':4,
        'E':5,
        'F':6,
        'G':7,
        'H':8,
        'I':9,
        'J':1,
        'K':2,
        'L':3,
        'M':4,
        'N':5,
        'O':6,
        'P':7,
        'Q':8,
        'R':9,
        'S':2,
        'T':3,
        'U':4,
        'V':5,
        'W':6,
        'X':7,
        'Y':8,
        'Z':9
    }
    const condensedDate = await condensed_date(someday, base)
    const importCheckDigit = await import_check_digit(amount)
    const content = reference.toString() + condensedDate.toString() + importCheckDigit.toString() + freeDigit.toString()
    const result = content.replace(/A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z/gi, function(s) {
        return alphabet[s]
    })

    const array = [11,13,17,19,23]
    const resultArray = result.split("")
    
    let sum = 0
    let i = 0
    for (const number of resultArray.reverse()) {
        sum = sum + parseInt(number)*array[i]
        i = i + 1
        if(i==5){
            i=0
        }
    }

    const residue = sum % 97
    let residuePlusOne = residue + 1
    // let residuePlusOne = 4

    if(Math.trunc(residuePlusOne/10) == 0) {
        residuePlusOne = residuePlusOne*10
    }

    const resultingReference = content + residuePlusOne.toString()


    return resultingReference
}

module.exports = { reference_check_digits }