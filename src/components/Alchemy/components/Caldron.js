import React, {useEffect, useState, useRef} from "react";
import {useFrame, useLoader} from 'react-three-fiber'
import * as THREE from 'three';
import {TextureLoader} from "../../../lib/loader/Three";
import caldrontxt from '../assets/chauldron/003-Chaudon.png';
import cldrpuddletxt from '../assets/chauldron/anim/puddle.png';
import cldrfigure1txt from '../assets/chauldron/anim/figure1.png';
import cldrfigure2txt from '../assets/chauldron/anim/figure2.png';
import cldrfigure3txt from '../assets/chauldron/anim/figure3.png';
import cldrposiondroptxt from '../assets/chauldron/anim/posiondrop.png';
import cldrwalldef1txt from '../assets/chauldron/anim/walldef1.png';
import cldrwalldef2txt from '../assets/chauldron/anim/walldef2.png';
import cldrwalldef3txt from '../assets/chauldron/anim/walldef3.png';
import droptxt from '../assets/chauldron/anim/drop.png';

import stonestxt from '../assets/decors/stones.png';
import tabletxt from '../assets/decors/table.png';

import posanim1txt from '../assets/chauldron/animposion/1.png';
import posanim2txt from '../assets/chauldron/animposion/2.png';
import posanim3txt from '../assets/chauldron/animposion/3.png';
import posanim4txt from '../assets/chauldron/animposion/4.png';
import posanim5txt from '../assets/chauldron/animposion/5.png';
import posanim6txt from '../assets/chauldron/animposion/6.png';
import useStore from "../../Three/store";

let i = 0, iF = 0;
let letbubbles = [];


const nonPremultipledBlend = {

    transparent: true

};

export const Caldron = ({tre}) => {

        const [caldron] = useLoader(TextureLoader, [caldrontxt]);
        const [cldrpuddle] = useLoader(TextureLoader, [cldrpuddletxt]);
        const [cldrfigure1] = useLoader(TextureLoader, [cldrfigure1txt]);
        const [cldrfigure2] = useLoader(TextureLoader, [cldrfigure2txt]);
        const [cldrfigure3] = useLoader(TextureLoader, [cldrfigure3txt]);
        const [cldrposiondrop] = useLoader(TextureLoader, [cldrposiondroptxt]);
        const [cldrwalldef1] = useLoader(TextureLoader, [cldrwalldef1txt]);
        const [cldrwalldef2] = useLoader(TextureLoader, [cldrwalldef2txt]);
        const [cldrwalldef3] = useLoader(TextureLoader, [cldrwalldef3txt]);
        const [stones] = useLoader(TextureLoader, [stonestxt]);
        const [table] = useLoader(TextureLoader, [tabletxt]);

        const anims = useLoader(TextureLoader, [
            posanim1txt,
            posanim2txt,
            posanim3txt,
            posanim4txt,
            posanim5txt,
            posanim6txt]);


        const [drop] = useLoader(TextureLoader, [droptxt]);

        const scaleG = 0.95;
        const fixedW = 1 * scaleG;
        const fixedH = 0.65 * scaleG;
        const cPosX = 0;
        const cPosY = -0.43;
        const startPosX = cPosX - fixedW / 2;
        const startPosY = cPosY - fixedH / 2;

        const [tick1, changeTick1] = useState(0);
        const [tick2, changeTick2] = useState(0);
        const [tick3, changeTick3] = useState(0);
        const [dAI, changeDaI] = useState(0);

        const mutation = useStore(state => state.mutation);
        const actions = useStore(state => state.actions);

        const [bubbles, setBubbles] = useState([]);

        useFrame(() => {
            const vel = 0.01;
            i += vel;

            const velSlow = 0.015;
            iF += velSlow;

            if (mutation.caldronSpray) {
                changeDaI(dAI + 0.2);
                if (dAI > 6) {
                    changeDaI(-1);
                    actions.stopCaldronSpray();
                }
            }


            let c;

            c = i;
            changeTick1(Math.clip(c % 2 > 1 ? c % 1 : 1 - c % 1, 0, 1));

            c = i + 1;
            changeTick2(Math.clip(c % 2 > 1 ? c % 1 : 1 - c % 1, 0, 1));

            c = i + 2.7;
            changeTick3(Math.clip(c % 2 > 1 ? c % 1 : 1 - c % 1, 0, 1));

            const bubblesCount = 5;
            const nowMs = Date.now();
            if (letbubbles.length < bubblesCount) {
                while (letbubbles.length < bubblesCount) {
                    letbubbles.push({
                        startX: startPosX + fixedW * 0.268 + fixedW * 0.450 * Math.random(),
                        x: 0,
                        y: startPosY + fixedH - fixedH * 0.111 - fixedH * 0.112 * Math.random(),
                        startScale: 0.3 + Math.random() * 0.5,
                        alpha: 1,
                        startToSin: 120 * Math.random(),
                        lifetime: nowMs + 2000 + 2000 * Math.random(),
                        speed: 0.001 + Math.random() * 0.002
                    });
                }
            }

            for (let j = 0; j < letbubbles.length; j++) {
                let bubble = letbubbles[j];
                bubble.x = bubble.startX + Math.sin((bubble.startToSin + iF) * 180 * 0.0174533) * 0.04;
                bubble.y += bubble.speed;
                const leftMsMax = 200;
                let leftMs = bubble.lifetime - nowMs;
                if (leftMs < leftMsMax) {
                    bubble.scale = Math.clip(leftMs / leftMsMax, 0, 1) * bubble.startScale;
                }else{
                    bubble.scale = bubble.startScale;
                }
            }

            letbubbles = letbubbles.filter(b => b.lifetime > nowMs);

            setBubbles(letbubbles);

        });

        return (
            <group ref={tre}>
                <mesh position={[startPosX + fixedW * 0.5, startPosY + fixedH * 0.1, 0]} scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[fixedW * 1.7, fixedW * 1.7 * 0.17]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={table}/>
                </mesh>

                <mesh position={[cPosX, cPosY, 0]} scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[fixedW, fixedH]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={caldron}/>
                </mesh>

                <mesh position={[startPosX + fixedW * 0.343, startPosY + fixedH - fixedH * 0.338, 0]} scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[fixedW * 0.309, fixedH * 0.319 + 0.06 * tick2]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={cldrposiondrop}/>
                </mesh>

                <mesh position={[startPosX + fixedW * 0.754, startPosY + fixedH - fixedH * 0.160 + 0.03 * tick2, 0]}
                      scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[fixedW * 0.162, fixedH * 0.174]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={cldrwalldef1}/>
                </mesh>

                <mesh position={[startPosX + fixedW * 0.242, startPosY + fixedH - fixedH * 0.153 + 0.03 * tick1, 0]}
                      scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[fixedW * 0.257, fixedH * 0.175]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={cldrwalldef2}/>
                </mesh>

                <mesh position={[startPosX + fixedW * 0.524, startPosY + fixedH - fixedH * 0.110 + 0.03 * tick3, 0]}
                      scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[fixedW * 0.390, fixedH * 0.134]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={cldrwalldef3}/>
                </mesh>

                <mesh position={[startPosX + fixedW * 0.495, startPosY + fixedH - fixedH * 0.177, 0]} scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[fixedW * 0.811, fixedH * 0.286]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={cldrpuddle}/>
                </mesh>

                <mesh position={[startPosX + fixedW * 0.696, startPosY + fixedH - fixedH * 0.181, 0]} scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[fixedW * 0.256 + 0.1 * tick3, fixedH * 0.159]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={cldrfigure1}/>
                </mesh>

                <mesh position={[startPosX + fixedW * 0.497, startPosY + fixedH - fixedH * 0.160, 0]} scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[fixedW * 0.164 + 0.05 * tick1, fixedH * 0.101]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={cldrfigure2}/>
                </mesh>

                <mesh position={[startPosX + fixedW * 0.430, startPosY + fixedH - fixedH * 0.186, 0]} scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[fixedW * 0.335 + 0.1 * tick2, fixedH * 0.138]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={cldrfigure3}/>
                </mesh>


                {dAI > 0 &&
                <mesh position={[startPosX + fixedW * 0.5, startPosY + fixedH * 1.2, 0]} scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[fixedW * 0.5, fixedH * 0.8]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={anims[parseInt(dAI)]}/>
                </mesh>}

                {bubbles.map((bubble, index) =>
                    <mesh position={[bubble.x, bubble.y, 0.01]} scale={[1, 1, 1]} key={index}>
                        <planeBufferGeometry attach="geometry" args={[0.1 * bubble.scale, 0.1 * bubble.scale]}/>
                        <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={drop}/>
                    </mesh>
                )}

                <mesh position={[startPosX + fixedW * 0.5, startPosY - fixedH * 0.02, 0]} scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[fixedW, fixedH * 0.338]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={stones}/>
                </mesh>

            </group>
        );
    }
;