import { names } from "./names"

function hashCode(s) {
    for (var i = 0, h = 0; i < s.length; i++)
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    return h;
}

const getNameHash = (id) => {
    let number = Math.abs(hashCode(id))
    return names[number % names.length]
}
export {
    getNameHash
}