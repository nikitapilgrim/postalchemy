import React from 'react';
import styled from "styled-components";
import {Title} from "../components/Title";
import {Paragraph} from "../components/Paragraph";
import {List} from "../components/List";
import {Columns, Column} from "../components/Columns";
import {Wrapper} from "../components/PageWrapper";
import {YouTube} from "../components/Youtube";
import {SliderContainer, sliderSettings} from "../components/SliderContainer.js";
import physicsimg from "../assets/seclusionphysics.jpg";


export const ImageContainer = styled.div`
  position: relative;
  max-width: 100%;
  height: 100%;
  width: 100%;
  margin-bottom: 0.5rem;
  overflow: hidden;
  img {
    position: absolute;
    top: -20%;
    left: 0;
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

const listData = [
    {
        title: `Individual Object Ticking.`,
        text: `Objects can be ticked individually without forcing a tick on the entire physics world. This is useful for client-side prediction in networked games. Ticking objects individually is more efficient, but may cause duplicate collisions if more than one object is handled this way.`
    },
    {
        title: `Safe Repositioning.`,
        text: `Bodies and individual shapes can be moved to arbitrary positions by an external process without compromising the integrity of the physics simulation. This occurs frequently when clients correct for prediction errors and must move a player controller to match the authoritative server's position. Seclusion Physics is largely stateless -- very little trajectory data is preserved between frames aside from the position, orientation, and angular/linear velocity of each body. `
    },
    {
        title: `History Tracking.`,
        text: `Seclusion physics can store historical state for dynamic objects and perform tests on an object's past world position. This is useful for lag compensation with raycast weapons in networked shooters.`
    },
    {
        title: `Simplicity.`,
        text: ` Seclusion Physics is designed to be simple to read and debug. This library offers as minimal a feature set as possible to keep the total source small and readable. `
    },
];


const Inner = styled.div`
  position: relative;
  padding: 0.5rem;
  &:after {
      content: "";
      clear: both;
      display: table;
  }
`;

const YoutubeContainer = styled.span`
    padding: 0.1rem;
    margin-top: 0.3rem;
    display: block;
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
    iframe {
      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      width: 100%;
      z-index: 1;
    } 
`;

const CustomList = styled(List)`
      padding-top: 0.3rem;
`;


const page1 = ({youtube}) => {

    return (
        <Wrapper color={'green'}>

            <Inner>
                <Title fontSize={1.3}>Seclusion Physics</Title>
                <Paragraph fontSize={0.6}>
                    <dl>
                        <dt><b>Client:</b> Internal, as well will be selling later</dt>
                        <dt><b>Status:</b> Currently in development.</dt>
                    </dl>
                    Seclusion physics — a 3d physics engine which designed to realtime multiplayer games. Engine contains:
                    a bounding volume hierarchy tree for optimizations, emphasis on zero-allocation principle, heavily optimized
                    (many usages refs in the math sub-system, many pools), objects history, raycasts and collision
                    tests to past time, safety repositioning (need to correct dynamic body positions if mispredict
                    happens), and much more...
                </Paragraph>
                <ImageContainer width={2}>
                    <img src={physicsimg} />
                </ImageContainer>
            </Inner>
        </Wrapper>
    );
};

const page2 = ({youtube}) => {
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
        <Wrapper color={'pink'}>
            <Inner>
                <Title fontSize={0.8}>Demonstration:</Title>
                <YouTube onReady={videoOnReady} opts={opts} videoId={'f4OepzNo2_0'}/>
                {/*<CustomList data={listData.slice(0, 1)}/>*/}
            </Inner>
        </Wrapper>
    );
};


const page3 = ({youtube}) => {

    return (
        <Wrapper color={'pink'}>
            <Inner>
                {/*<CustomList data={listData.slice(1, 3)}/>*/}
            </Inner>
        </Wrapper>
    );
};

const page4 = ({youtube}) => {

    return (
        <Wrapper color={'pink'}>
            <Inner>
                {/*<CustomList data={listData.slice(3, 4)}/>*/}
            </Inner>
        </Wrapper>
    );
};


export const SeclusionPhysics = [page1, page2];