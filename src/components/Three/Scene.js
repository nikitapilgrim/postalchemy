import React, {useRef, useState} from 'react';
import * as THREE from 'three';
import {TextureLoader} from "../../lib/loader/Three";
import {useFrame, useThree, useLoader} from "react-three-fiber";
import {Caldron} from '../Alchemy/components/Caldron'
import {Girl} from '../Alchemy/components/Girl'
import {Cosmo} from '../Alchemy/components/Cosmo'
import {Projects} from '../Alchemy/components/Projects'


import dark from '../Alchemy/assets/effects/dark.png'
import useStore from "./store";
import project3txt from "../Alchemy/assets/decors/projects/3.png";

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

export function Scene() {

    const { camera } = useThree();
    const mutation = useStore(state => state.mutation);
    const { mouse, raycaster, openProject } = mutation;
    const qwe = useRef(null);
    const actions = useStore(state => state.actions);
    const [darkScreen] = useLoader(TextureLoader, [dark]);

    const getCof = camPos => {
        const cof = (100 - (Math.abs(camPos) / 0.50 * 100)) / 100;
        return Math.sign(cof) ? cof : 0.001;
    };

    useFrame(() => {
        // t += 0.01;
        // changeTick3(t)
        camera.position.x += (Math.clip(mouse.x, -1, 1) * 0.8 - camera.position.x) * 0.05 * getCof(camera.position.x);
        camera.position.y += (Math.clip(mouse.y, -1, 1) * 0.05 - camera.position.y) * 0.05;


        if (qwe != null && qwe.current != null) {
            raycaster.setFromCamera( mouse, camera );

            let intersects = raycaster.intersectObjects( qwe.current.children );

            let isIntersected = false;
            for ( var i = 0; i < intersects.length; i++ ) {

                // console.log( intersects[ i ])
                if (isFunction(intersects[ i ].object.userData ))
                {
                    intersects[ i ].object.userData(mutation.isMouseClicked);
                    isIntersected = true;
                }
            }
            actions.cancelShoot();
            if (!isIntersected)
                qwe.current.userData();
        }
    });



    return (
        <group>
            <group position={[0, 0, -1.5]}>
                <Cosmo />
            </group>

            <group position={[0, 0, -1.49]}>
                <Projects tre={qwe} />
            </group>

            <group position={[0, 0, -1]} >
                <Caldron />
            </group>

            <group position={[0, 0, -1.2]} >
                <Girl />
            </group>

            <mesh position={[0, 0, -0.5]} scale={[0.98, 0.98, 0.98]}>*/}
                <planeBufferGeometry attach="geometry" args={[3.7, 3.7 * 0.64]}/>
                <meshBasicMaterial attach="material" transparent={true} map={darkScreen} />
            </mesh>

            {/*<mesh position={[0, 0, -0.5]} scale={[1, 1, 1]}>*/}
            {/*    <planeBufferGeometry attach="geometry" args={[3.7, 3.7 * 0.44]}/>*/}
            {/*    <meshBasicMaterial opacity={0.5} attach="material" {...nonPremultipledBlend} map={dark} />*/}
            {/*</mesh>*/}
        </group>
    );
}