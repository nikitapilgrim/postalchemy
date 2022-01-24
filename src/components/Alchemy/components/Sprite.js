import React from "react";

export const Sprite = ({pos = [0,0,0], w = 1, h = 1, t, r = 0, o = [0,0]}) => {

    const nonPremultipledBlend = {
        transparent: true
    };

    return (
        <group position={[pos[0] + o[0] * w, pos[1] + o[1] * h, pos[2]]} rotation={[0,0,r]}>
            <mesh position={[-o[0] * w, -o[1] * h, 0]} scale={[1, 1, 1]}>
                <planeBufferGeometry attach="geometry" args={[w, h]}/>
                <meshBasicMaterial attach="material" {...nonPremultipledBlend} map={t}/>
            </mesh>
        </group>
    )
};