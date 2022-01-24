import React, {useEffect, useState} from "react";
import {useFrame, useLoader} from 'react-three-fiber'
import * as THREE from 'three';
import {TextureLoader} from "../../../lib/loader/Three";
import {bezier} from '../../../bezier';

import bodytxt from '../assets/girl/body.png';
import leftthairbacktxt from '../assets/girl/leftthairback.png';
import cloaktxt from '../assets/girl/cloak.png';
import righthairbacktxt from '../assets/girl/righthairback.png';
import sleevebacktxt from '../assets/girl/sleeveback.png';
import lefthandtxt from '../assets/girl/lefthand.png';
import righthandtxt from '../assets/girl/righthand.png';
import sleevetxt from '../assets/girl/sleeve.png';
import rightwristtxt from '../assets/girl/rightwrist.png';
import leftwristtxt from '../assets/girl/leftwrist.png';
import hattxt from '../assets/girl/hat.png';
import headtxt from '../assets/girl/head.png';
import lefthairtxt from '../assets/girl/lefthair.png';
import righthairtxt from '../assets/girl/righthair.png';

import {Sprite} from '../components/Sprite'

import useStore from "../../Three/store";
const easing = bezier(0.56, -0.02, 0.49, 1.00);

let i = 0, iF = 0, iFs = 0;

export const Girl = ({tre}) => {

        const [body] = useLoader(TextureLoader, [bodytxt]);
        const [leftthairback] = useLoader(TextureLoader, [leftthairbacktxt]);
        const [cloak] = useLoader(TextureLoader, [cloaktxt]);
        const [righthairback] = useLoader(TextureLoader, [righthairbacktxt]);
        const [sleeveback] = useLoader(TextureLoader, [sleevebacktxt]);
        const [lefthand] = useLoader(TextureLoader, [lefthandtxt]);
        const [righthand] = useLoader(TextureLoader, [righthandtxt]);
        const [sleeve] = useLoader(TextureLoader, [sleevetxt]);
        const [rightwrist] = useLoader(TextureLoader, [rightwristtxt]);
        const [leftwrist] = useLoader(TextureLoader, [leftwristtxt]);
        const [hat] = useLoader(TextureLoader, [hattxt]);
        const [head] = useLoader(TextureLoader, [headtxt]);
        const [lefthair] = useLoader(TextureLoader, [lefthairtxt]);
        const [righthair] = useLoader(TextureLoader, [righthairtxt]);


        const processAll = (t) => {
            t.forEach(q => {
                q.generateMipmaps = false;
                q.magFilter = THREE.LinearFilter;
                q.minFilter = THREE.LinearFilter;
            });
        };

        useEffect(() => {
            const all = [body,
                leftthairback,
                cloak,
                righthairback,
                sleeveback,
                lefthand,
                righthand,
                sleeve,
                rightwrist,
                leftwrist,
                hat,
                head,
                lefthair,
                righthair];
            processAll(all);
        }, [body,
            leftthairback,
            cloak,
            righthairback,
            sleeveback,
            lefthand,
            righthand,
            sleeve,
            rightwrist,
            leftwrist,
            hat,
            head,
            lefthair,
            righthair]);

        const scaleG = 1.4;
        const fixedW = 1 * scaleG;
        const fixedH = 0.93 * scaleG;
        const cPosX = 0;
        const cPosY = 0;
        const startPosX = cPosX - fixedW / 2;
        const startPosY = cPosY - fixedH / 2 + fixedH;

        const [tick1, changeTick1] = useState(0);
        const [tick2, changeTick2] = useState(0);
        const [tick3, changeTick3] = useState(0);

        useFrame(() => {
            const vel = 0.004;
            i += vel;

            const velSlow = 0.008;
            iF += velSlow;

            const velFs = 0.006;
            iFs += velFs;


            let c;

            c = i;
            changeTick1(easing(Math.clip(c % 2 > 1 ? c % 1 : 1 - c % 1, 0, 1)));

            c = iF;
            changeTick2(easing(Math.clip(c % 2 > 1 ? c % 1 : 1 - c % 1, 0, 1)));

            c = iFs;
            changeTick3(easing(Math.clip(c % 2 > 1 ? c % 1 : 1 - c % 1, 0, 1)));



        });

        const nonPremultipledBlend = {

            transparent: true

        };

        const rotationRateGirl = 0.08;



        const righthandW = fixedW * 0.125;
        const righthandH = fixedH * 0.254;
        const righthandOriginW = righthandW * 0.4;
        const righthandOriginH = righthandH * 0.4;

        const rightwristW = fixedW * 0.141;
        const rightwristH = fixedH * 0.105;
        const rightwristOriginW = rightwristW * 0.3;
        const rightwristOriginH = rightwristH * 0.3;

        const lefthandW = fixedW * 0.125;
        const lefthandH = fixedH * 0.254;
        const lefthandOriginW = -lefthandW * 0.4;
        const lefthandOriginH = lefthandH * 0.4;

        const leftwristW = fixedW * 0.111;
        const leftwristH = fixedH * 0.129;
        const leftwristOriginW = 0;
        const leftwristOriginH = leftwristH * 0.5;

        return (
            <group ref={tre} position={[0, -fixedH, 0]} rotation={[0,0,-rotationRateGirl + rotationRateGirl * 2 * tick1]}>



                <mesh position={[startPosX + fixedW * 0.52, startPosY  + fixedH - fixedH * 0.431, 0]} scale={[1 + (tick3) * 0.08, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[fixedW * 0.961, fixedH * 0.717]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={cloak}/>
                </mesh>
                <mesh position={[startPosX + fixedW * 0.483, startPosY + fixedH - fixedH * 0.637, 0]} scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[fixedW, fixedH * 0.732]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={body}/>
                </mesh>
                <mesh position={[startPosX + fixedW * 0.476, startPosY  + fixedH - fixedH * 0.549, 0]} scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[fixedW * 0.52, fixedH * 0.159]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={sleeveback}/>
                </mesh>

                <mesh position={[startPosX + fixedW * 0.476, startPosY  + fixedH - fixedH * 0.575, 0]} scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[fixedW * 0.475, fixedH * 0.220]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={sleeve}/>
                </mesh>
                <group rotation={[0, 0, -tick2 * 0.3]} position={[-righthandOriginW + startPosX + fixedW * 0.743, -righthandOriginH + startPosY  + fixedH - fixedH * 0.41, 0]}>
                    <group position={[righthandOriginW, righthandOriginH, 0]}>
                        <mesh position={[0, 0, 0]} scale={[1, 1, 1]}>
                            <planeBufferGeometry attach="geometry" args={[righthandW, righthandH]}/>
                            <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={righthand}/>
                        </mesh>
                        <group rotation={[0, 0,( -tick2 + 0.5)  * 0.8  ]} position={[-rightwristOriginW + fixedW * 0.095, -rightwristOriginH + fixedH * 0.13, 0]}>
                            <mesh position={[rightwristOriginW, rightwristOriginH, 0]} scale={[1, 1, 1]}>
                                <planeBufferGeometry attach="geometry" args={[rightwristW, rightwristH]}/>
                                <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={rightwrist}/>
                            </mesh>
                        </group>
                    </group>
                </group>

                <group rotation={[0, 0, tick2 * 0.3]} position={[-lefthandOriginW + startPosX + fixedW * 0.205, -lefthandOriginH + startPosY  + fixedH - fixedH * 0.426, 0]}>
                    <group position={[lefthandOriginW, lefthandOriginH, 0]}>
                        <mesh position={[0, 0, 0]} scale={[1, 1, 1]}>
                            <planeBufferGeometry attach="geometry" args={[lefthandW, lefthandH]}/>
                            <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={lefthand}/>
                        </mesh>
                        <group rotation={[0, 0, ( tick2 - 0.5)  * 0.8]} position={[-leftwristOriginW - fixedW * 0.08, -leftwristOriginH + fixedH * 0.15, 0]}>
                            <mesh position={[leftwristOriginW, leftwristOriginH, 0]} scale={[1, 1, 1]}>
                                <planeBufferGeometry attach="geometry" args={[leftwristW, leftwristH]}/>
                                <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={leftwrist}/>
                            </mesh>
                        </group>
                    </group>
                </group>


                <mesh position={[startPosX + fixedW * 0.512, startPosY  + fixedH - fixedH * 0.137, 0]} scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[fixedW * 0.52, fixedH * 0.266]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={hat}/>
                </mesh>

                <mesh position={[startPosX + fixedW * 0.443, startPosY  + fixedH - fixedH * 0.293, 0]} scale={[1, 1, 1]}>
                    <planeBufferGeometry attach="geometry" args={[fixedW * 0.302, fixedH * 0.193]}/>
                    <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={head}/>
                </mesh>

                <Sprite pos={[startPosX + fixedW * 0.420, startPosY  + fixedH - fixedH * 0.319, 0]} w={fixedW * 0.105} h={fixedH * 0.251} t={lefthair} o={[0,0.5]} r={(tick1 - 0.5) * 0.15}/>
                <Sprite pos={[startPosX + fixedW * 0.598, startPosY  + fixedH - fixedH * 0.345, 0]} w={fixedW * 0.118} h={fixedH * 0.227} t={righthair} o={[0,0.5]} r={(tick1 - 0.5) * 0.15}/>


            </group>
        );
    }
;