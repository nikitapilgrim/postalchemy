import * as THREE from 'three';
import {TextureLoader} from "../../lib/loader/Three";
import {
    BrowserView,
    MobileView,
    isBrowser,
    isTablet,
    isMobile
} from "react-device-detect";
import React, {Suspense, useRef, useEffect, useCallback} from 'react';
import {useWindowSize, useFullscreen, useToggle} from 'react-use';
import {useResource} from "../../lib/loader/useResource";
import {useLocation} from "wouter";
import styled from 'styled-components';
import {Canvas} from 'react-three-fiber';
import {Scene} from "./Scene";

import Hud from './Hud';
import useStore from './store';

import blur from '../Alchemy/assets/decors/backblur.jpg';

const Wrapper = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
`;

const Blur = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(${blur});
  background-size: cover;
  z-index: 2;
  pointer-events: none;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 1s ease-in-out;
`;

function App() {
    const [show, toggle] = useToggle(false);
    const {fov, openProject} = useStore(state => state.mutation);
    const actions = useStore(state => state.actions);
    const refWrapper = useRef(null);
    const isFullscreen = useFullscreen(refWrapper, show, {onClose: () => toggle(false)});
    const {width, height} = useWindowSize();
    const [location, setLocation] = useLocation();

    const toggleFullscreen = useCallback(() => {
        toggle()
    }, []);


    return (
        <Wrapper ref={refWrapper}>
            <Hud handlerFullscreen={toggleFullscreen}/>
            {!isMobile && !isTablet && width > 750 && <>
                <Canvas
                    onPointerMove={actions.updateMouse}
                    onClick={actions.shoot}
                    gl2={true}
                    camera={{position: [0, 0, 0], near: 0.01, far: 10000, fov}}

                    onCreated={({gl, camera}) => {
                        // actions.init(camera)
                        gl.gammaInput = true;
                        gl.toneMapping = THREE.Uncharted2ToneMapping;
                        gl.setClearColor(new THREE.Color('#16161a'));
                    }}>
                    <Suspense fallback={null}>
                        <Scene/>
                    </Suspense>
                </Canvas>
                <Blur visible={openProject !== null || location.split('/').length === 3}/>
            </>}

        </Wrapper>
    );
}

export default App;
