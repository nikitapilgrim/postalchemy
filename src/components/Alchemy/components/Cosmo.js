import React, {useEffect, useState, useRef} from "react";
import {useFrame, useLoader} from 'react-three-fiber'
import * as THREE from 'three';
import {TextureLoader} from "../../../lib/loader/Three";

import cieltxt from '../assets/window/004_bleus_ciel.png';
import bgtxt from "../assets/decors/bg.png";

import glowtxt from '../assets/window/001_Glow.png';
import etoilstxt from '../assets/window/003_Etoiles.png';
import etoil1txt from '../assets/window/étoile1.png';
import etoil2txt from '../assets/window/étoile2.png';
import etoil3txt from '../assets/window/étoile3.png';
import etoil4txt from '../assets/window/étoile_4.png';

const nonPremultipledBlend = {
    transparent: true
};

export const Cosmo = () => {

        const [ciel] = useLoader(TextureLoader, [cieltxt]);
        const [bg] = useLoader(TextureLoader, [bgtxt]);

        const [glow] = useLoader(TextureLoader, [glowtxt]);
        const [etoils] = useLoader(TextureLoader, [etoilstxt]);
        const [etoil1] = useLoader(TextureLoader, [etoil1txt]);
        const [etoil2] = useLoader(TextureLoader, [etoil2txt]);
        const [etoil3] = useLoader(TextureLoader, [etoil3txt]);
        const [etoil4] = useLoader(TextureLoader, [etoil4txt]);
        const main = useRef();

        return (
            <group ref={main}>

                <mesh position={[0, 0.6, -1]} scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[3, 3]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={ciel} />
                </mesh>
                <mesh position={[0, 0.6, -1]} scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[3, 3]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={glow} />
                </mesh>
                <mesh position={[-0.2, 0.6, -0.5]} scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[0.5, 1]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={etoil4} />
                </mesh>
                <mesh position={[0, 0.6, -1]} scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[3, 3]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={etoil3} />
                </mesh>
                <mesh position={[0, 0.6, -0.9]} scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[3, 3]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={etoil2} />
                </mesh>
                <mesh position={[0, 0.6, -0.8]} scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[3, 3]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={etoil1} />
                </mesh>
                <mesh position={[0, 0.6, -1]} scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[1.5, 3]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={etoils} />
                </mesh>



                <mesh position={[0, 0, 0]} scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[5, 3]}/>
                    <meshBasicMaterial {...nonPremultipledBlend} attach="material" map={bg} />
                </mesh>
            </group>
        );
    }
;