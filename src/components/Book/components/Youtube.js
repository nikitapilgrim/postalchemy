import React, {useMemo, useState, useEffect, useContext, useRef, useCallback, useReducer, useLayoutEffect} from 'react';
import YTPlayer from 'yt-player';
import useDebounce from 'react-use/lib/useDebounce';
import useRafLoop from 'react-use/lib/useRafLoop';
import styled from "styled-components";

export const YoutubeContext = React.createContext(null);

const Wrapper = styled.div`
    flex-shrink: 5;
    width: 100%;
    height: 100%;
    padding: 0.1rem;
    margin-top: 0.3rem;
    position: relative;
    overflow: hidden;
`;

const Inner = styled.div`
    overflow: hidden;
    position: relative;
    width:100%;
    iframe {
      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    &::after {
        padding-top: 56.25%;
        display: block;
        content: '';
    }
`;

const Preview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  filter: ${props => props.isPreloadDone ? `grayscale(0) sepia(0)` : `grayscale(100%) sepia(0.5)`};
  opacity: ${props => props.opacity ? `1` : `0`};
  background-color: transparent;
  transition: all 1.5s;
  pointer-events: none;
 
  img {
    display: block;
    max-width: 100%
  }
`;

const getPreviewImgUrl = (videoId, quality) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};


const opts = {
    autoplay: true,
    captions: false,
    controls: true,
    keyboard: false,
    annotations: false,
    modestBranding: false,
    related: false,
    playsInline: true,
};

const initialState = {
    init: false,
    preloaded: false,
    active: false,
    opacity: true
};


function reducer(state, action) {
    switch (action.type) {
        case 'init':
            return {...state, init: true};
        case 'preloaded':
            return {...state, preloaded: action.payload};
        case 'active':
            return {...state, active: action.payload};
        case 'opacity':
            return {...state, opacity: action.payload};
        default:
            throw new Error();
    }
}

export const YouTube = ({videoId, onReady, preview}) => {
    const ref = useRef(null);
    const previewImg = useRef(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [player, setPlayer] = useState(null);
    const turnContext = useContext(YoutubeContext);
    const [loopStop, isActive, loopStart] = useRafLoop(() => {
        if (state.init && state.active && state.preloaded && player !== null) {
            player.play();
        }
    }, [state.init, state.active, player, state.preloaded]);

    const handlerStart = () => {


    };

    const handlerPause = () => {

    };

    const handlerEnd = (player) => () => {
        player.play();
    };

    useEffect(() => {
        if (ref && ref.current && !state.init && state.active) {
            const yt = new YTPlayer(ref.current, opts);
            setPlayer(yt);
            yt.on('playing', handlerStart);
            yt.on('paused', handlerPause);
            yt.on('ended', handlerEnd(yt));
            yt.load(videoId);
            yt.mute();
            yt.play();
            dispatch({type: 'init', payload: true});
        }
    }, [ref, state.init, state.active]);

    useEffect(() => {
        if (state.init && !state.active && player !== null) {
            player.stop();
            dispatch({type: 'preloaded', payload: false});
            dispatch({type: 'opacity', payload: true});
            loopStop();
        }
        if (state.init && state.active && player !== null) {
            player.play();
            player.mute();
            dispatch({type: 'preloaded', payload: true});
        }

    }, [state.active, player, state.init]);

    const [, cancel] = useDebounce(
        () => {
            if (state.init && state.active && state.preloaded && player !== null) {
                dispatch({type: 'opacity', payload: false});
                player.play();
                loopStart();
                player.mute();
            }
        },
        3000,
        [state.init, state.active, player, state.preloaded]
    );



    useEffect(() => {
        if (turnContext.turn) {
            const active = turnContext.turn.view.some(v => v === turnContext.index);
            dispatch({type: 'active', payload: active});
        }
        if (turnContext === false) {
            dispatch({type: 'active', payload: true});
        }
    }, [turnContext]);


    return (
        <Wrapper>
            <Inner>
                <Preview isPreloadDone={state.preloaded} opacity={state.opacity}>
                    <img src={preview || previewImg.current} alt="preview"/>
                </Preview>
                <div ref={ref}></div>
            </Inner>
        </Wrapper>
    );
};
