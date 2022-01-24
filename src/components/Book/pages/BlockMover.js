import React from 'react';
import styled from "styled-components";
import {Title} from "../components/Title";
import {Paragraph} from "../components/Paragraph";
import {List} from "../components/List";
import Slider from "react-slick";
import {YouTube} from "../components/Youtube";
import {Wrapper} from "../components/PageWrapper";
import {Blank} from "./Blank";
import {SliderContainer, sliderSettings} from "../components/SliderContainer.js"

const assets = {
    blockmover: [
        require("../assets/blockmover1.jpg"),
        require("../assets/blockmover2.jpg"),
        require("../assets/blockmover3.png")
    ]
};

const CustomList  = styled(List)`

`;


export const ImageContainer = styled.div`
  width: 100%;
  img {
    max-width: 100%;
    height: auto;
  }
  .imageContainer {
    &:not(:fist-child) {
      margin-top: 1rem;
    }
  }
`;



const Inner = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0.5rem;
  
  .imageContainer {
    &:not(:first-child) {
      margin-top: auto;
    }
  }
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
        event.target.playVideo();
    };

    return (
        <Wrapper color={'green'}>

            <Inner>
                <Title fontSize={1.3}>Block Mover</Title>
                <Paragraph fontSize={0.6}>
                    <dl>
                        <dt><b>Client:</b> Internal</dt>
                        <dt><b>Finished:</b> January 2018</dt>
                    </dl>
                    A logic puzzle game. Many of game modes, competitions around the world. More than 100 levels.
                    The game has contain: 4 axis cubic physics, a level editor, an analytics system,
                    integration with google play game services for competitions between players around the world.
                </Paragraph>
                <YouTube onReady={videoOnReady} opts={opts} videoId={'M8e0Ve_IuZk'}/>

            </Inner>
        </Wrapper>
    );
};


const page2 = () => {
    return (
        <Wrapper>
            <Inner>
                <ImageContainer className={"imageContainer"}>
                    <img src={assets.blockmover[1]} alt=""/>
                </ImageContainer>
                <ImageContainer className={"imageContainer"}>
                    <img src={assets.blockmover[2]} alt=""/>
                </ImageContainer>
            </Inner>
        </Wrapper>
    )
};


export const BlockMover = [page1, page2];