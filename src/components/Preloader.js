import React, {Suspense, useState, useEffect, useRef, useCallback} from 'react';
import styled from "styled-components";
import {useWindowSize} from 'react-use';
import loading from "./Alchemy/assets/loading.gif";
import wip from "./Alchemy/assets/wip.png";
import {
    BrowserView,
    MobileView,
    isBrowser,
    isTablet,
    isMobile
} from "react-device-detect";

const Wrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 9999;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #16141A;
`;

const GrayContainer = styled.div`
  position: absolute;
  height: ${props => 100 - props.height}%;
  width: 100%;
  z-index: 9999;
  top: 0;
  left: 0;
  background: url(${wip});
  background-size: cover;
  background-position: 50% 50%;
  filter: grayscale(1);
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  height: 0.1rem;
  width: 10rem;
  background-color: #16141A;
`;

const ProgressLine = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  height: 100%;
  width: ${props => props.width}%;
  background-color: #FFFFFF;
  border-radius: 2px;
  transition: all 1s ease-out;
`;

const GIFContainer = styled.div`
  position: absolute;
  top: -125px;
  z-index: -2;
  img {
    max-width: 100%;
    height: auto;
  }
`;

export const Preloader = ({percent}) => {
    const {width, height} = useWindowSize();
    const per = (isMobile || isTablet) ? percent * 2 : percent;
    const show = (!isMobile && !isTablet && width > 750 && percent !== 100) || (isMobile && percent * 2 !== 100 || isTablet && percent * 2 !== 100);

    return (
        <>
            {
                show &&
                <Wrapper>
                    <Container>
                        <ProgressLine width={per}></ProgressLine>
                        <GIFContainer>
                            <img src={loading} alt="gif"/>
                        </GIFContainer>
                    </Container>
                </Wrapper>
            }
        </>
    );
};