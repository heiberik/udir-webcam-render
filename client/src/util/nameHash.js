import { words } from "./words"

function hashCode(s) {
    for (var i = 0, h = 0; i < s.length; i++)
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    return h;
}

function getNameHash(id) {

    const firstIDPart = id.substring(0, id.length / 2)
    const secondIDPart = id.substring(id.length / 2, id.length)

    const oddIndex = getOddNumber(Math.abs(hashCode(firstIDPart)))
    const evenIndex = getEvenNumber(Math.abs(hashCode(secondIDPart)))

    const adjective = words[evenIndex % words.length]
    const noun = words[oddIndex % words.length]

    const name = adjective + " " + noun
    return name
}

function getOddNumber(number) {
    if (isOdd(number)) return number
    else return number + 1
}

function getEvenNumber(number) {
    if (!isOdd(number)) return number
    else return number + 1
}

function isOdd(number) {
    return number % 2
}
export {
    getNameHash
}