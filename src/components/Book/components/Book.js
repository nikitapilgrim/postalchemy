import React, {useEffect, useRef, useCallback, useMemo, useState, useLayoutEffect} from 'react';
import styled, {css, createGlobalStyle} from "styled-components";
import useMount from "react-use/lib/useMount";
import useUnmount from "react-use/lib/useUnmount";
import {Link, Route} from "wouter";
import * as jq from 'jquery';
import {useLocation} from "wouter";
import {Turn} from "./Turn";
import {PageWrapper} from "./PageWrapper";
import {useWindowSize} from 'react-use';

// layout
// pages
import {SeclusionPhysics} from "../pages/SeclusionPhysics";
import {BlockMover} from "../pages/BlockMover";
import {TheWalkingFishes} from "../pages/TheWalkingFishes";
import {PrimeWorld} from "../pages/PrimeWorld";
import {VideoCourse} from "../pages/VideoCourse";
import {RestaurantMobile} from "../pages/RestaurantMobile";
import {Team} from "../pages/Team";
import {DonutLab} from "../pages/DonutLab";
import book from '../../Alchemy/assets/book/book.png';
import useStore from "../../Three/store";
import {ComplexCollege} from "../pages/ComplexCollege";
import {Contact} from "../pages/Contact";

const assets = {
    buttons: {
        prev: {
            press: require("../../Alchemy/assets/buttons/leftp.png"),
            hover: require("../../Alchemy/assets/buttons/lefth.png"),
            normal: require("../../Alchemy/assets/buttons/leftn.png"),
        },
        next: {
            press: require("../../Alchemy/assets/buttons/rightp.png"),
            hover: require("../../Alchemy/assets/buttons/righth.png"),
            normal: require("../../Alchemy/assets/buttons/rightn.png"),
        },
        back: {
            press: require("../../Alchemy/assets/buttons/backp.png"),
            hover: require("../../Alchemy/assets/buttons/backh.png"),
            normal: require("../../Alchemy/assets/buttons/backn.png"),
        },
    }
};

const BOOK_WIDTH = 1562;
const BOOK_HEIGHT = 1009;

const style = css`
  background-color: red;
`;
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  opacity: ${props => props.isOpen ? `1` : `0`};
  z-index: ${props => props.isOpen ? `3` : `-1`};
  pointer-events: none;
`;


const BookContent = styled.div`
  height: 100%;
  width: 100%;
  padding: 2.5%;
  padding-bottom: 5%;
  position: absolute;
  top: 0;
  left: 0;
`;

const BookWrapper = styled.div`
  display: inline-block;
  position: relative;
  left: 50%;
  top: 50%;
  transform-origin: center center;
  transform: translate(-50%, -50%);
  width: ${props => BOOK_WIDTH * props.scale}px;
  height: ${props => BOOK_HEIGHT * props.scale}px;
  pointer-events: auto;
  
  img {
        max-width: 100%;
        pointer-events: none;
        display: inline-block;
        user-select: none;
  }
`;

const Button = css`
  background: none;
  outline: none;
  border: none;
  width: 2.6rem;
  height: 2.5rem;
  background-size: cover;
  cursor: pointer;
  position: absolute;
  z-index: 2;
   top: 50%;
     transform: translateY(-50%);


`;

const Prev = styled.button`
  left: -2.5rem;
  ${Button};
  background-image: url(${assets.buttons.prev.normal});
  &:hover {
      background-image: url(${assets.buttons.prev.hover});
  }
  &:active {
      background-image: url(${assets.buttons.prev.press});
  }
  
`;
const Next = styled.button`
  right: -2.5rem;
  ${Button};
   background-image: url(${assets.buttons.next.normal});
  &:hover {
      background-image: url(${assets.buttons.next.hover});
  }
  &:active {
      background-image: url(${assets.buttons.next.press});
  }

`;
const Back = styled.button`
 ${Button};
  transform: none;
  top: 0rem;
  right: 0rem;
   background-image: url(${assets.buttons.back.normal});
  &:hover {
      background-image: url(${assets.buttons.back.hover});
  }
  &:active {
      background-image: url(${assets.buttons.back.press});
  }`;


const GlobalStyle = createGlobalStyle`
   .slick-slider {
      margin-bottom: 0.5rem;
   }
   .slick-dots {
    bottom: -1rem !important;
   }
`;

export const Book = () => {
    const ref = useRef(null);
    const {openProject, lastBookPage, currentBookPage} = useStore(state => state.mutation);
    const [toggleBook, setToogleBook] = useState(false);
    const actions = useStore(state => state.actions);
    const windowSize = useWindowSize();
    const windowHeight = windowSize.height;
    const windowWidth = windowSize.width;
    const [location, setLocation] = useLocation();

     useEffect(() => {
        if (location.split('/').length === 3) {
            setToogleBook(true);
        } else {
            setToogleBook(false);
        }
    }, [location]);

    const initScale = useMemo(() => {
        return Math.min((windowWidth * 0.8) / 1562, windowHeight / 1009);
    }, [windowHeight, windowWidth]);


    const handlerNext = () => {
        window.__turn.turn("next");
    };

    const handlerPrev = () => {
        window.__turn.turn("previous");
    };

    const handlerCloseBook = () => {
        actions.openProject(null);
        setLocation("/");
    };

    return (
        <Wrapper isOpen={toggleBook}>
            <GlobalStyle/>
            <BookWrapper scale={initScale}>
                {currentBookPage > 3 && <Prev onClick={handlerPrev}/>}
                <Back onClick={handlerCloseBook}/>
                <img src={book} alt="book"/>
                <BookContent ref={el => ref.current = el}>
                    <Turn width={BOOK_WIDTH * initScale} height={BOOK_HEIGHT * initScale} className={style}>
                        <PageWrapper
                            articles={[BlockMover, ComplexCollege, DonutLab, PrimeWorld, RestaurantMobile, SeclusionPhysics, TheWalkingFishes, VideoCourse, Team, [Contact]]}/>
                    </Turn>
                </BookContent>
                {currentBookPage < lastBookPage -1 && <Next onClick={handlerNext}/>}

            </BookWrapper>
        </Wrapper>

    );
};

