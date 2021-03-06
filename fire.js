const firePixelArray = []
const fireWidth = 50
const fireHeight = 50
const fireColorsPalette = [{ "r": 7, "g": 7, "b": 7 }, { "r": 31, "g": 7, "b": 7 }, { "r": 47, "g": 15, "b": 7 }, { "r": 71, "g": 15, "b": 7 }, { "r": 87, "g": 23, "b": 7 }, { "r": 103, "g": 31, "b": 7 }, { "r": 119, "g": 31, "b": 7 }, { "r": 143, "g": 39, "b": 7 }, { "r": 159, "g": 47, "b": 7 }, { "r": 175, "g": 63, "b": 7 }, { "r": 191, "g": 71, "b": 7 }, { "r": 199, "g": 71, "b": 7 }, { "r": 223, "g": 79, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 103, "b": 15 }, { "r": 207, "g": 111, "b": 15 }, { "r": 207, "g": 119, "b": 15 }, { "r": 207, "g": 127, "b": 15 }, { "r": 207, "g": 135, "b": 23 }, { "r": 199, "g": 135, "b": 23 }, { "r": 199, "g": 143, "b": 23 }, { "r": 199, "g": 151, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 175, "b": 47 }, { "r": 183, "g": 175, "b": 47 }, { "r": 183, "g": 183, "b": 47 }, { "r": 183, "g": 183, "b": 55 }, { "r": 207, "g": 207, "b": 111 }, { "r": 223, "g": 223, "b": 159 }, { "r": 239, "g": 239, "b": 199 }, { "r": 255, "g": 255, "b": 255 }]

let fireIntensityChanger = 36

let isDebugActive = false

function debugMode() {

    if (isDebugActive == true) {
        return isDebugActive = false
    }
    return isDebugActive = true;
}

// initial function
function start() {
    createFireDataStructure()
    createFireSource()
    renderFire()

    setInterval(calculateFirePropagation, 50)
}

function createFireDataStructure() {
    // create a 2D array
    // each array position is a fire's pixel with an intensity

    const numberOfPixels = fireWidth * fireHeight

    for (let i = 0; i < numberOfPixels; i++) {
        firePixelArray[i] = 0
    }
}

function calculateFirePropagation() {

    // run over the columns first and after render fire
    for (let column = 0; column < fireWidth; column++) {
        for (let row = 0; row < fireHeight; row++) {
            const pixelIndex = column + (fireWidth * row)

            updateFireIntensityPerPixel(pixelIndex)
        }
    }
    renderFire()
}

function updateFireIntensityPerPixel(currentPixelIndex) {
    belowPixelIndex = currentPixelIndex + fireWidth

    if (belowPixelIndex > fireWidth * fireHeight) {
        return
    }

    const decay = Math.floor(Math.random() * 3)
    const belowPixelFireIntensity = firePixelArray[belowPixelIndex]
    const newFireIntensity = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0

    firePixelArray[currentPixelIndex - decay] = newFireIntensity
}

function createFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + column

        firePixelArray[pixelIndex] = fireIntensityChanger
    }
}

function renderFire() {
    const debug = isDebugActive

    // table
    let html = '<table cellpadding=0 cellspacing=0>'

    // rows
    for (let row = 0; row < fireHeight; row++) {

        html += '<tr>'

        // columns
        for (let column = 0; column < fireWidth; column++) {
            // discover the position vertical and horizontal 
            const pixelIndex = column + (fireWidth * row)

            // get the fireIntensity on the structure
            const fireIntensity = firePixelArray[pixelIndex]

            if (debug === true) {
                const color = fireColorsPalette[fireIntensity]
                const colorString = `${color.r},${color.g},${color.b}`
                html += '<td>'
                html += `<div class="pixel-index">${pixelIndex}</div>`
                html += `<div style="color: rgb(${colorString})">`
                html += fireIntensity
                html += `</div>`
                html += '</td>'
            } else {
                const color = fireColorsPalette[fireIntensity]
                const colorString = `${color.r},${color.g},${color.b}`
                html += `<td class="pixel" style="background-color: rgb(${colorString})">`
                html += `</td>`
            }


        }

        html += '</tr>'
    }

    html += '</table>'

    document.querySelector('#fireCanvas').innerHTML = html
}

function destroyFire() {

    for (let column = 0; column <= fireHeight; column++) {
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + column

        firePixelArray[pixelIndex] = 0
        if (firePixelArray[pixelIndex] > 0) {
            firePixelArray[pixelIndex] = 0
        }
    }

}

function decreaseFire() {
    for (let column = 0; column <= fireHeight; column++) {
        const overflowPixelIndex = fireHeight * fireWidth
        const pixelIndex = (overflowPixelIndex - fireWidth) + column

        const currentFireIntensity = firePixelArray[pixelIndex]

        if (currentFireIntensity > 0) {
            const decrease = Math.floor(Math.random() * 14)
            const newFireIntensity = currentFireIntensity - decrease < 0 ? 0 : currentFireIntensity - decrease

            firePixelArray[pixelIndex] = newFireIntensity
        }
    }

}

function maxFire() {
    for (let column = 0; column <= fireHeight; column++) {
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + column

        firePixelArray[pixelIndex] = 36
    }
}

function growFire() {
    for (let column = 0; column < fireHeight; column++) {
        const overflowPixelIndex = fireHeight * fireWidth
        const pixelIndex = (overflowPixelIndex - fireWidth) + column

        const currentFireIntensity = firePixelArray[pixelIndex]

        if (currentFireIntensity < 36) {
            const increase = Math.floor(Math.random() * 14)
            const newFireIntensity = currentFireIntensity + increase > 36 ? 36 : currentFireIntensity + increase

            firePixelArray[pixelIndex] = newFireIntensity
        }
    }
}

start()