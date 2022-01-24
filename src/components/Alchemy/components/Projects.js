import React, {useEffect, useState, useRef} from "react";
import {useFrame, useLoader} from 'react-three-fiber'
import * as THREE from 'three';
import {TextureLoader} from "../../../lib/loader/Three";

import project1txt from '../assets/decors/projects/1.png';
import project2txt from '../assets/decors/projects/2.png';
import project3txt from '../assets/decors/projects/3.png';
import project4txt from '../assets/decors/projects/4.png';
import project5txt from '../assets/decors/projects/5.png';
import project6txt from '../assets/decors/projects/6.png';
import project7txt from '../assets/decors/projects/7.png';
import project8txt from '../assets/decors/projects/8.png';
import project9txt from '../assets/decors/projects/9.png';
import project10txt from '../assets/decors/projects/10.png';
import contacttxt from '../assets/decors/projects/contact.png';
import useStore from "../../Three/store";

let projectIsComing = false;
let comingProjectId = -1;

const currentScaleMin = 1;
const currentScaleVel = 0.08;
const currentScaleMax = 1.15;

let phase = 0;
let speedDown = 0;
const speedDownG = 1.3;
let minWaitI = 0, minWaitMax = 1;


export const Projects = ({tre}) => {
    const [project1] = useLoader(TextureLoader, [project1txt]);
    const [project2] = useLoader(TextureLoader, [project2txt]);
    const [project3] = useLoader(TextureLoader, [project3txt]);
    const [project4] = useLoader(TextureLoader, [project4txt]);
    const [project5] = useLoader(TextureLoader, [project5txt]);
    const [project6] = useLoader(TextureLoader, [project6txt]);
    const [project7] = useLoader(TextureLoader, [project7txt]);
    const [project8] = useLoader(TextureLoader, [project8txt]);
    const [project9] = useLoader(TextureLoader, [project9txt]);
    const [contact] = useLoader(TextureLoader, [contacttxt]);

    const [pOX, changePoX] = useState(0);
    const [pOY, changePoY] = useState(0);
    const [pOZ, changePoZ] = useState(0);
    const [trigger, changeTrigger] = useState(false);
    const [currentScales, changeCurrentScales] = useState(new Array(10).fill(1));
    const [selectedProjectId, changeSelectedProjectId] = useState(0);
    const actions = useStore(state => state.actions);


    const BG_WIDTH = 5;
    const BG_HEIGHT = 3;
    const BG_X = 0;
    const BG_Y = 0;


    const startPositions = [
        [BG_X - BG_WIDTH / 2 + BG_WIDTH * 0.256, BG_Y + BG_HEIGHT / 2 - BG_HEIGHT * 0.225, 0],
        [BG_X - BG_WIDTH / 2 + BG_WIDTH * 0.174, BG_Y + BG_HEIGHT / 2 - BG_HEIGHT * 0.380, 0],
        [BG_X - BG_WIDTH / 2 + BG_WIDTH * 0.248, BG_Y + BG_HEIGHT / 2 - BG_HEIGHT * 0.52, 0],
        [BG_X - BG_WIDTH / 2 + BG_WIDTH * 0.169, BG_Y + BG_HEIGHT / 2 - BG_HEIGHT * 0.52, 0],
        [BG_X - BG_WIDTH / 2 + BG_WIDTH * 0.256, BG_Y + BG_HEIGHT / 2 - BG_HEIGHT * 0.652, 0],
        [BG_X - BG_WIDTH / 2 + BG_WIDTH * 0.700, BG_Y + BG_HEIGHT / 2 - BG_HEIGHT * 0.546, 0],
        [BG_X - BG_WIDTH / 2 + BG_WIDTH * 0.767, BG_Y + BG_HEIGHT / 2 - BG_HEIGHT * 0.405, 0],
        [BG_X - BG_WIDTH / 2 + BG_WIDTH * 0.811, BG_Y + BG_HEIGHT / 2 - BG_HEIGHT * 0.545, 0],
        [BG_X - BG_WIDTH / 2 + BG_WIDTH * 0.709, BG_Y + BG_HEIGHT / 2 - BG_HEIGHT * 0.687, 0],
        [BG_X - BG_WIDTH / 2 + BG_WIDTH * 0.819, BG_Y + BG_HEIGHT / 2 - BG_HEIGHT * 0.84, 0]
    ];


    const upCaldronPoint = [0, 0.6, 0.55];

    const nonPremultipledBlend = {
        transparent: true
    };

    useFrame(() => {
        if (projectIsComing && comingProjectId !== -1) {
            switch (phase) {
                case 0:
                    const pos = sum(startPositions[comingProjectId], pOX, pOY, pOZ);
                    changePoX(pOX + (upCaldronPoint[0] - pos[0]) * 0.2);
                    changePoY(pOY + (upCaldronPoint[1] - pos[1]) * 0.2);
                    changePoZ(pOZ + (upCaldronPoint[2] - pos[2]) * 0.2);
                    if (Math.abs(upCaldronPoint[1] - pos[1]) < 0.01) {
                        phase = 1;
                    }
                    break;
                case 1:
                    changePoY(pOY + speedDown);
                    speedDown *= speedDownG;
                    if (startPositions[comingProjectId][1] + pOY < 0){
                        changePoY(-10);
                        phase = 2;
                        actions.giveCaldronSpray();
                    }
                    break;
                case 2:
                    minWaitI += 0.02;
                    if (minWaitI > minWaitMax) {
                        actions.openProject(comingProjectId);
                        projectIsComing = false;
                        changePoX(0);
                    }
                    break;
            }
        }
    });

    const test = (isClick, idx) => {
        if (!projectIsComing) {
            if (isClick) {
                console.log(idx + " project. Click?  " + isClick );
                changeSelectedProjectId(-1);
                comingProjectId = idx;
                projectIsComing = true;
                phase = 0;
                speedDown = -0.005;
                minWaitI = 0;
                changePoX(0);
                changePoY(0);
                changePoZ(0);
            }else{
                changeSelectedProjectId(idx);
            }
        }

        checkScales();
    };

    const checkScales = () => {
        let justOneChanged = false;
        for (let i = 0; i < currentScales.length; i++) {
            let cS = currentScales[i];
            if (i === selectedProjectId) {
                if (cS < currentScaleMax){
                    cS += currentScaleVel;
                    justOneChanged = true;
                }
            }else{
                if (cS > currentScaleMin){
                    cS -= currentScaleVel;
                    justOneChanged = true;
                }
            }
            currentScales[i] = cS;
        }

        if (justOneChanged)
        {
            changeTrigger(trigger === false);
        }
    };

    const sumIfNeed = (pox, poy, poz, idx) => {
        let vec3 = startPositions[idx];
        if (idx === comingProjectId && projectIsComing)
            return sum(vec3, pox, poy, poz);
        else
            return vec3;
    };

    const sum = (vec3, pox, poy, poz) => {
      return [vec3[0] + pox, vec3[1] + poy, vec3[2] + poz];
    };

    const getScaleTo = (idx, notUsedTrigger) => {
        return [currentScales[idx], currentScales[idx], currentScales[idx]]
    };

    const cancelSelected = () => {
        changeSelectedProjectId(-1);
        checkScales();
    };


    return (
        <group ref={tre} userData={() => cancelSelected()}>
            <mesh position={sumIfNeed(pOX, pOY, pOZ, 0)} scale={getScaleTo(0, trigger)} userData={(isClick) => test(isClick, 0)}>
                <planeBufferGeometry attach="geometry" args={[0.4, 0.4]}/>
                <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={project1} />
            </mesh>
            <mesh position={sumIfNeed(pOX, pOY, pOZ, 1)} scale={getScaleTo(1, trigger)} userData={(isClick) => test(isClick, 1)}>
                <planeBufferGeometry attach="geometry" args={[0.4, 0.2]}/>
                <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={project2} />
            </mesh>
            <mesh position={sumIfNeed(pOX, pOY, pOZ, 2)} scale={getScaleTo(2, trigger)} userData={(isClick) => test(isClick, 2)}>
                <planeBufferGeometry attach="geometry" args={[0.4, 0.4]}/>
                <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={project3} />
            </mesh>
            <mesh position={sumIfNeed(pOX, pOY, pOZ, 3)} scale={getScaleTo(3, trigger)} userData={(isClick) => test(isClick, 3)}>
                <planeBufferGeometry attach="geometry" args={[0.4, 0.4]}/>
                <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={project4} />
            </mesh>
            <mesh position={sumIfNeed(pOX, pOY, pOZ, 4)} scale={getScaleTo(4, trigger)} userData={(isClick) => test(isClick, 4)}>
                <planeBufferGeometry attach="geometry" args={[0.45, 0.45]}/>
                <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={project5} />
            </mesh>
            <mesh position={sumIfNeed(pOX, pOY, pOZ, 5)} scale={getScaleTo(5, trigger)} userData={(isClick) => test(isClick, 5)}>
                <planeBufferGeometry attach="geometry" args={[0.4, 0.24]}/>
                <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={project6} />
            </mesh>
            <mesh position={sumIfNeed(pOX, pOY, pOZ, 6)} scale={getScaleTo(6, trigger)} userData={(isClick) => test(isClick, 6)}>
                <planeBufferGeometry attach="geometry" args={[0.4, 0.4]}/>
                <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={project7} />
            </mesh>
            <mesh position={sumIfNeed(pOX, pOY, pOZ, 7)} scale={getScaleTo(7, trigger)} userData={(isClick) => test(isClick, 7)}>
                <planeBufferGeometry attach="geometry" args={[0.4, 0.4]}/>
                <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={project8} />
            </mesh>
            <mesh position={sumIfNeed(pOX, pOY, pOZ, 8)} scale={getScaleTo(8, trigger)} userData={(isClick) => test(isClick, 8)}>
                <planeBufferGeometry attach="geometry" args={[0.4, 0.4]}/>
                <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={project9} />
            </mesh>
            <mesh position={sumIfNeed(pOX, pOY, pOZ, 9)} scale={getScaleTo(9, trigger)} userData={(isClick) => test(isClick, 9)}>
                <planeBufferGeometry attach="geometry" args={[0.4, 0.4]}/>
                <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={contact} />
            </mesh>

        </group>
    );
};