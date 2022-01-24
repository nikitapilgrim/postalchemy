import React from 'react';
import styled from "styled-components";
import {Title} from "../components/Title";
import {Paragraph} from "../components/Paragraph";
import {List} from "../components/List";
import Slider from "react-slick";
import {YouTube} from "../components/Youtube";
import {Wrapper} from "../components/PageWrapper";
import {SliderContainer, sliderSettings} from "../components/SliderContainer.js"
import {ImageContainer} from "./BlockMover";

const assets = {
    thewalkingfishes: [
        require("../assets/thewalkingfishes.jpg"),
        require("../assets/thewalkingfishes2.png"),
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

const MiniImg = styled.img`
  width: 0.6Srem; 
  height: 0.6rem;
  margin: 0;
  padding: 0;
  
`;

const page1 = () => {
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
                <Title fontSize={1.3}>The Walking Fishes</Title>
                <Paragraph fontSize={0.6}>
                    <dl>
                        <dt><b>Client:</b> Internal</dt>
                        <dt><b>Finished:</b> 17 Oct 2018.</dt>
                        <dt><b>Publications:</b> <a href="https://pikabu.ru/story/kak_delayut_igryi_srednego_masshtaba_razrabotchiki_odinochki_5199303" target="_blank">
                            <MiniImg src="https://img.icons8.com/ios-filled/50/000000/pikabu.png" alt=""/>
                        </a></dt>
                    </dl>
                    Online game 1 vs 1. Written on java + libgdx. Multiservice architecture, mongo db for keep user
                    data, multithread room denouement and much more…
                </Paragraph>
                    <YouTube onReady={videoOnReady} opts={opts} videoId={'P_t2f3aY3q4'}/>
                {/*<Slider {...sliderSettings}>*/}
                {/*    {assets.thewalkingfishes.map((src, i) => {*/}
                {/*        return (*/}
                {/*            <SliderContainer key={i}>*/}
                {/*                <img src={src} alt=""/>*/}
                {/*            </SliderContainer>*/}
                {/*        );*/}
                {/*    })*/}
                {/*    }*/}
                {/*</Slider>*/}
            </Inner>
        </Wrapper>
    );
};


const page2 = () => {
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
                <Paragraph fontSize={0.6}>
                    The game has contain: an automatic generator protocol data exchange and serialization to bytecode,
                    a network transport layer system, animation system, UI technology, analytics,
                    and much more. Also in addition to above said, has available extend and powerful level editor.
                </Paragraph>
                <ImageContainer>
                    <img src={assets.thewalkingfishes[1]} alt=""/>
                </ImageContainer>
            </Inner>
        </Wrapper>
    );
};

export const TheWalkingFishes = [page1, page2];