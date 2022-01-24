import React from 'react';
import styled from "styled-components";
import {Title} from "../components/Title";
import {Paragraph} from "../components/Paragraph";
import {List} from "../components/List";
import Slider from "react-slick";
import {YouTube} from "../components/Youtube";
import {Wrapper} from "../components/PageWrapper";
import {SliderContainer, sliderSettings} from "../components/SliderContainer.js"
import {Blank} from "./Blank";


const assets = {
    restauran: [
        require("../assets/restoraun.jpg"),
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
                <Title fontSize={1.3}>Restaurant Mobile App</Title>
                <Paragraph fontSize={0.6}>
                    <dl>
                        <dt><b>Client:</b> Internal</dt>
                        <dt><b>Finished:</b> 13 Oct 2018</dt>
                        <dt><b>Links:</b> <a target={'_blank'} href={'https://www.youtube.com/watch?v=LT7eSt7UouM'}>More</a></dt>

                    </dl>
                    Our startup for Saint-Petersburg's restaurant. That's mobile app, which may allow make order inside
                    a restaurant (so example: you make order near restaurant, and when you arrived you eat will be
                    ready). Also in mobile app you can call waiter, receive promotions, read menu, food details, and much more...
                </Paragraph>
                <YouTube onReady={videoOnReady} opts={opts} videoId={'LT7eSt7UouM'}/>

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
        console.log(event);
        event.target.playVideo();
    };

    return (
        <Wrapper color={'pink'}>
            <Inner>
                <YouTube onReady={videoOnReady} opts={opts} videoId={'DvRUkLDEjE4'}/>
            </Inner>
        </Wrapper>
    );
};


export const RestaurantMobile = [page1, page2];