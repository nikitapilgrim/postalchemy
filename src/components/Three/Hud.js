import React, {useRef, useState, useEffect} from 'react';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isTablet,
    isMobile
} from "react-device-detect";
import {Book} from "../Book/components/Book";
import {useWindowSize} from 'react-use';
import {Alchemy} from "../Alchemy";

import styled, {css} from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
`;

const FullScreenButton = styled.div`
  position: fixed;
  z-index: 5;
  background-color: white;
`;

export default function Hud({handlerFullscreen}) {
    const {width, height} = useWindowSize();

    return (
        <>
            {!isMobile && !isTablet && width > 750 ? <>
                <Book/>
            </>: <Wrapper>
                <Alchemy/>
            </Wrapper>}
        </>
    );
};