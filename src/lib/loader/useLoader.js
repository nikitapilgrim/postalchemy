import React, {useState, useEffect, useMemo} from 'react';
import useMount from 'react-use/lib/useMount';
import {Loader} from "./index";
import {emitter} from "./Three";

const THREE_TEXTURE_COUNT = 51;

export const useLoader = ({resources}) => {
    if (!Array.isArray(resources)) throw new Error('Must be Array');
    const [countTextures, setCountTexture] = useState(0);
    const [threejsTextures, setThreejsTextures] = useState([]);
    const [percentLoadingBook, setPercentLoadingBook] = useState(0);
    const handlerProgress = (e) => {
        const {progress} = e;
        setPercentLoadingBook(Math.round(progress));
    };
    const [loader] = useState(Loader({resources, onProgress: handlerProgress}));

    useMount(() => {
        emitter.on('count', count => setCountTexture(count));
        emitter.on('threejsload', texture => setThreejsTextures(prev => [...prev, texture]));
    });

    const percentLoading = useMemo(() => {
        const percentThreejs = Math.round(threejsTextures.length / THREE_TEXTURE_COUNT * 100);
        return (Math.round(percentLoadingBook / 2 + percentThreejs / 2));
    }, [threejsTextures, percentLoadingBook]);

    return {loader, progress: percentLoading};
};