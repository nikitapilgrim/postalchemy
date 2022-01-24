import * as THREE from "three";
import mitt from 'mitt';
export const emitter = mitt();

let count = 0;

export function TextureLoader() {
    const cache = THREE.Cache;
    cache.enabled = true;

    const textureLoader = new THREE.TextureLoader();
    const fileLoader = new THREE.FileLoader();

    fileLoader.setResponseType('blob');

    function load(url, onLoad, onProgress, onError) {
        emitter.emit('count', ++count);
        fileLoader.load(url, cacheImage, onProgress, onError);
        const customOnLoad = (e) => {
            emitter.emit('threejsload', e);
            onLoad(e)
        };
        function cacheImage(blob) {
            const objUrl = URL.createObjectURL(blob);
            const image = document.createElementNS('http://www.w3.org/1999/xhtml', 'img');

            image.onload = ()=> {
                cache.add(url, image);
                URL.revokeObjectURL(objUrl);
                document.body.removeChild(image);
                loadImageAsTexture();
            };

            image.src = objUrl;
            image.style.visibility = 'hidden';
            document.body.appendChild(image);
        }

        function loadImageAsTexture() {
            textureLoader.load(url, customOnLoad, (e)=> {console.log(e, true)}, onError);
        }
    }

    return Object.assign({}, textureLoader, {load});
}

