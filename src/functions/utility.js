import React from 'react'

export function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default Capitalize;