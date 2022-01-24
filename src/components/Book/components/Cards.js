import React, {useRef, useState, useMemo, useContext} from 'react';
import ReactDOMServer from 'react-dom/server';
import styled, {css} from 'styled-components';
import Swing from "react-swing";

const CardsContext = React.createContext(null);

const Viewport = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
    padding: 8%;
    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        max-width: 400px;
        position: relative;
    }
    
`;

const CustomCard = styled.div`
    width: 100%;
    max-width: 400px;
    height: 100%;
    list-style: none;
    background: #fff;
    border-radius: 15px;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    cursor: grab;
    transform-style: preserve-3d;
    ${props => {
        if (props.rotate) {
            return `
            transition transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform: rotateY(${props.rotate}deg) !important;
            `
        }
    }};
`;


const config = {
    minThrowOutDistance: 1000,
    maxThrowOutDistance: 2000,
};
//ReactDOMServer.renderToString(element);

let isDragging = false;
export const Cards = () => {
    const swing = useRef(null);
    const [stack, setStack] = useState(null);
    const [list, setList] = useState([
        {id: 1, label: '♣', click: false},
        {id: 2, label: '♦', click: false},
        {id: 3, label: '♥', click: false},
        {id: 4, label: '♠', click: false},
        ]);
    const [view, setView] = useState(0);
    const rotate = view % 2 === 0 ? 180 : 0;
    const handlerClick = (id) => () => {
        if (!isDragging) {
            setView(state => state + 1);
            setList(state => {
                let newState = state.find(item => item.id === id);
                newState.click = true;
                return [...state,  newState]
            })
        }
        isDragging = true;


    };


    return (
        <Viewport>
            <CardsContext.Provider value={null}>
                <Swing
                    tagName="div"
                    setStack={stack => setStack({stack: stack})}
                    ref={swing}
                    throwout={e => console.log('throwout', e)}
                    config={config}

                >
                    {list.map((item, i) => {
                        return (
                            <CustomCard dragmove={e => console.log(e)} key={item.id} onClick={handlerClick(item.id)} click={item.click} rotate={rotate}>{item.label}</CustomCard>
                        )
                    })}
                </Swing>
            </CardsContext.Provider>
        </Viewport>
    );
};


