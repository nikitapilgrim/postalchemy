import React from 'react';
import styled from "styled-components";
import {Title} from "../components/Title";
import {Paragraph} from "../components/Paragraph";
import {List} from "../components/List";
import Slider from "react-slick";
import {Wrapper} from "../components/PageWrapper";
import {SliderContainer, sliderSettings} from "../components/SliderContainer.js"

import {YouTube} from "../components/Youtube";
import {ImageContainer} from "./BlockMover";

const assets = {
    pw: [
        require("../assets/pw1.jpg"),
        require("../assets/pw2.jpg")
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
                <Title fontSize={1.3}>Prime World</Title>
                <Paragraph fontSize={0.6}>
                    <dl>
                        <dt><b>Client:</b> Nival</dt>
                        <dt><b>Finished collaboration:</b> 9 Sep 2018</dt>
                        <dt><b>Links:</b> <a target={'_blank'} href={'https://ru.playpw.com/'}>More</a></dt>
                    </dl>
                    We worked at the Prime World as small team in support development. That’s a game like the Dota 2.
                </Paragraph>
                <YouTube onReady={videoOnReady} opts={opts} videoId={'ROwjlD6ImYI'}/>
                {/*<Slider {...sliderSettings}>*/}
                {/*    /!*{assets.pw.map((src, i) => {*!/*/}
                {/*    /!*    return (*!/*/}
                {/*    /!*        <SliderContainer key={i}>*!/*/}
                {/*    /!*            <img src={src} alt=""/>*!/*/}
                {/*    /!*        </SliderContainer>*!/*/}
                {/*    /!*    );*!/*/}
                {/*    /!*})*!/*/}
                {/*    /!*}*!/*/}
                {/*    */}
                {/*</Slider>*/}
            </Inner>
        </Wrapper>
    );
};

const page2 = () => {

    return (
        <Wrapper color={'green'}>
            <Inner>
                <Paragraph fontSize={0.6}>
                    There were finished at that project: the tool for increase project building time on dev environment, some
                    big features, such as the new heroes logic, new spells logic. Also we were improved networking code
                    performance in some places, it had saving very much $ on server payings.
                </Paragraph>
                <ImageContainer className={"imageContainer"}>
                    <img src={assets.pw[0]} alt=""/>
                </ImageContainer>


            </Inner>
        </Wrapper>
    );
};

export const PrimeWorld = [page1, page2];