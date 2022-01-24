import insideWorker from 'offscreen-canvas/inside-worker'

const worker = insideWorker(e => {
    if (e.data.canvas) {
        // Here we will initialize Three.js
    }
})