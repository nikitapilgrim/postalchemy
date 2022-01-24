import React, {useRef, useEffect, useState} from "react";
import styled from "styled-components";
import {useLocation} from "wouter";
import * as jq from "jquery";
import "../../../lib/turn.js/index";
import useMount from 'react-use/lib/useMount';
import useUnmount from 'react-use/lib/useUnmount';
import useComponentSize from '@rehooks/component-size';
import useStore from "../../Three/store";

export const TurnContext = React.createContext(null);

const Wrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
`;

const pages = {
    0: 2,
    1: 4,
    2: 6,
    3: 8,
    4: 10,
    5: 18,
    8: 12,
    6: 14,
    7: 16,
    9: 20
};

const routes = {
    'Block_Mover': [2, 3],
    'Complex_College_Solution': [4, 5],
    'Donut_Lab': [6, 7],
    'Restaurant_Mobile_App': [10, 11],
    'Seclusion_Physics': [12, 13],
    'The_Walking_Fishes': [14, 15],
    'GameDev_Video_Course': [16, 17],
    'About_Team': [18, 19],
    'Prime_World': [8, 9],
    'Contacts': [20, 0]
};

const Inside = ({children, width, height, size}) => {
    const {openProject} = useStore(state => state.mutation);
    const actions = useStore(state => state.actions);
    const ref = useRef(null);
    const [options, setOptions] = useState(null);
    const [init, setInit] = useState(false);
    const [current, setCurrent] = useState([0, 1]);
    const [value, setValue] = useState(null);
    const [location, setLocation] = useLocation();


    useEffect(() => {
        if (init && ref && ref.current) {
            const project = location.split('/')[2];
            if (project) {
                jq(ref.current).turn("page", routes[project] || 2);
                setCurrent(routes[project] || window.__turn.turn("view"));
            }
        }
    }, [location, ref, init, openProject]);


    useEffect(() => {
        if (openProject !== null || location.split('/')[2] && ref && ref.current) {
            setValue({ref: jq(ref.current), view: current});
        }
    }, [openProject, current, ref, location]);

    useEffect(() => {
        const route = Object.entries(routes).filter(pair => {
            const [key, value] = pair;
            return JSON.stringify(current) === JSON.stringify(value);
        });
        if (route[0]) {
            setLocation(`/project/${route[0][0]}`);
        }
    }, [current]);

    useEffect(() => {
        if (init && openProject !== null) {
            jq(ref.current).turn("page", pages[openProject]);
        }
    }, [openProject, init]);

    useMount(() => {
        window.__turn = jq(ref.current);
        window.__turn.bind('start',
            function (event, pageObject, corner) {
                if (corner == 'tl' || corner == 'tr' || corner == 'bl' || corner == 'br') {
                    event.preventDefault();
                }
            }
        );

        setOptions({
            width: width,
            height: height,
            display: "double",
            acceleration: true,
            duration: 800,
            elevation: 400,
            gradients: !jq.isTouch,
            when: {
                turning: function (e, page) {
                    actions.setCurrentPage(page);
                },
                turned: (e, page) => {
                    setCurrent(window.__turn.turn("view"));
                }
            }
        });
        setTimeout(() => {
            setInit(true);
        }, 0);
    });

    useEffect(() => {
        if (init) {
            jq(ref.current).turn("size", size.width * 0.92, size.height * 0.92);
        }
    }, [width, height, init]);

    useEffect(() => {
        if (options && ref && ref.current) {
            jq(ref.current).turn(Object.assign({}, options));
        }
        document.addEventListener("keydown", handleKeyDown, false);
    }, [options]);

    useUnmount(() => {
        jq(ref.current)
            .turn("destroy")
            .remove();

        document.removeEventListener("keydown", handleKeyDown, false);
    });

    const handleKeyDown = event => {

    };


    return (
        <Inner ref={ref}>
            <TurnContext.Provider value={value}>
                {children}
            </TurnContext.Provider>
        </Inner>
    );
};

export const Turn = props => {
    const ref = useRef(null);
    const size = useComponentSize(ref);
    const {width, height} = size;

    return (
        <Wrapper
            className={props.className}
            style={Object.assign({}, props.style)}
            ref={el => {
                ref.current = el;
            }}
        >
            {width && <Inside size={{width: props.width, height: props.height}} width={width} height={height}>
                {props.children}
            </Inside>}
        </Wrapper>
    );
};

