import * as THREE from 'three'
import {Curves} from 'three/examples/jsm/curves/CurveExtras'
import {addEffect} from 'react-three-fiber'
import create from 'zustand'

const [useStore] = create((set, get) => {
    let spline = new Curves.GrannyKnot();
    let track = new THREE.TubeBufferGeometry(spline, 250, 0.15, 10, true);

    return {
        sound: true,
        camera: undefined,
        points: 0,
        health: 100,
        //lasers: [],
        //explosions: [],
        //rocks: randomData(120, track, 150, 8, () => 1 + Math.random() * 2.5),
        //enemies: randomData(10, track, 20, 15, 1),

        mutation: {
            t: 0,
            position: new THREE.Vector3(),
            startTime: Date.now(),

            track,
            scale: 15,
            fov: 75,
            hits: false,
            //rings: randomRings(30, track),
            //particles: randomData(3000, track, 50, 1, () => 0.5 + Math.random() * 0.5),
            looptime: 40 * 1000,
            binormal: new THREE.Vector3(),
            normal: new THREE.Vector3(),
            clock: new THREE.Clock(false),
            mouse: new THREE.Vector2(0, 0),
            raycaster: new THREE.Raycaster(),
            isMouseClicked: false,
            caldronSpray: false,
            openProject: null,
            currentBookPage: null,
            lastBookPage: null,
            // Re-usable objects
            //dummy: new THREE.Object3D(),
            //ray: new THREE.Ray(),
            //box: new THREE.Box3()
        },

        actions: {
            init(camera) {
                const {mutation, actions} = get();

                set({camera});
                mutation.clock.start();


                addEffect(() => {

                    const time = Date.now();
                    const t = (mutation.t = ((time - mutation.startTime) % mutation.looptime) / mutation.looptime);
                    mutation.position = track.parameters.path.getPointAt(t);
                    mutation.position.multiplyScalar(mutation.scale);

                })
            },
            setCurrentPage(p) {
                set(s => ({ mutation: {...s.mutation, currentBookPage: p} }))
            },
            setLastPage(p) {
                set(s => ({ mutation: {...s.mutation, lastBookPage: p} }))
            },
            shoot() {
                get().mutation.isMouseClicked = true;
            },
            cancelShoot() {
                get().mutation.isMouseClicked = false;
            },
            giveCaldronSpray() {
                get().mutation.caldronSpray = true;
            },
            stopCaldronSpray() {
                get().mutation.caldronSpray = false;
            },
            openProject(idx) {
                set(s => ({ mutation: {...s.mutation, openProject: idx} }))
            },
            updateMouse({clientX: x, clientY: y}) {
                get().mutation.mouse.set((x - window.innerWidth / 2) / (window.innerWidth / 2), -1 * (y - window.innerHeight / 2) / (window.innerHeight / 2))
            },
        }
    }
});

export default useStore

