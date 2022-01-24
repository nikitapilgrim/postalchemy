import React from 'react';
import styled from "styled-components";
import {Title} from "../components/Title";
import {Paragraph} from "../components/Paragraph";
import {List} from "../components/List";
import Slider from "react-slick";
import {YouTube} from "../components/Youtube";
import {Wrapper} from "../components/PageWrapper";
import {SliderContainer, sliderSettings} from "../components/SliderContainer.js"

const assets = {

    donutlab: [
    ]
};
const CustomList = styled(List)`

`;



const Inner = styled.div`
  position: relative;
  padding: 0.5rem;
  &:after {
      content: "";
      clear: both;
      display: table;
  }
`;

const page1 = ({youtube}) => {
    const opts = {
        height: '100%',
        width: '100%',
        playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            cc_load_policy: 0,
            controls: 0,
            iv_load_policy: 3,
            rel: 0,
            showinfo: 0
        }
    };

    const videoOnReady = (event) => {
        console.log(event);
        event.target.playVideo();
    };

    return (
        <Wrapper color={'green'}>
            <Inner>
                <Title fontSize={1.3}>Kids Vs. Zombies</Title>
                <Paragraph fontSize={0.6}>
                    <dl>
                        <dt><b>Client:</b> DonutLab Inc.</dt>
                        <dt><b>Finished collaboration:</b> 25 Oct 2019</dt>
                        <dt><b>Links:</b> <a target={'_blank'} href={'https://donut.games/'}>More</a></dt>
                    </dl>
                    Multiplayer mobile topdown shooter. The goal is to prevent other players from collecting more
                    donuts. For this, there are various special abilities that you do not allow to do this.
                </Paragraph>
                <YouTube onReady={videoOnReady} opts={opts} videoId={'0ppmlVxSam0'}/>
            </Inner>
        </Wrapper>
    );
};

const page2 = ({youtube}) => {
    return (
        <Wrapper color={'green'}>
            <Inner>
                <Paragraph fontSize={0.6}>
                    We worked on almost all key aspects of the game - optimized AStar path search, client-server
                    architecture, animation system, transport network layer. Optimized physics designed for highload systems,
                    the mechanics of distributing logic handlers over multiple threads. The system of physics simulations
                    in case of desynchronization client/server shared logic. And much more...
                </Paragraph>

            </Inner>
        </Wrapper>
    );
};


export const DonutLab = [page1, page2];