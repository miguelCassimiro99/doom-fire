const firePixelArray = []
const fireWidth = 2
const fireHeight = 3

// initial function
function start() {
    createFireDataStructure();
    console.log(firePixelArray)
}

function createFireDataStructure() {
    // create a 2D array
    // each array position is a fire's pixel with an intensity

    const numberOfPixels = fireWidth * fireHeight

    for(let i=0; i < numberOfPixels; i++) {
        firePixelArray[i] = 0
    }
}

function calculateFirePropagation() {

}

function renderFire() {
    
}




start()