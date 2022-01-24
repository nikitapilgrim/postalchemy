import React from 'react';
import styled from "styled-components";
import {Title} from "../components/Title";
import {Paragraph} from "../components/Paragraph";
import {List} from "../components/List";
import {YouTube} from "../components/Youtube";
import {Wrapper} from "../components/PageWrapper";

const assets = {
    videocourse: [
        require("../assets/vcreviews.png"),
    ]
};


const CustomList = styled(List)`

`;

const ImageContainer = styled.div`
  width: 100%;
  img {
    max-width: 100%;
    height: auto;
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
        console.log(event);
        event.target.playVideo();
    };

    return (
        <Wrapper color={'green'}>
            <Inner>
                <Title fontSize={1.3}>GameDev Video Course</Title>
                <Paragraph fontSize={0.6}>
                    <dl>
                        <dt><b>Client:</b> Non commercial</dt>
                        <dt><b>Finished:</b> 17 April 2018</dt>
                        <dt><b>Links:</b> <a target={'_blank'} href={'https://www.youtube.com/playlist?list=PLn1IN0XhQMc1O9wxheSjsFYDW_MNXaQ8E'}>More</a></dt>
                    </dl>
                    We had created free game development videocourse for beginners with more than <b>20 000</b> summary views at YouTube.
                </Paragraph>
                <YouTube onReady={videoOnReady} opts={opts} videoId={'13E9RjOvZHA'}/>

                {/*<ImageContainer>*/}
                {/*    <img src={assets.videocourse[0]} alt=""/>*/}
                {/*</ImageContainer>*/}
            </Inner>
        </Wrapper>
    );
};

const page2 = () => {
    return (
        <Wrapper>
            <Inner>
                {/*<ImageContainer className={"imageContainer"}>*/}
                {/*    <img src={assets.gif[0]} alt=""/>*/}
                {/*</ImageContainer>*/}
                {/*<ImageContainer className={"imageContainer"}>*/}
                {/*    <img src={assets.gif[1]} alt=""/>*/}
                {/*</ImageContainer>*/}
            </Inner>
        </Wrapper>
    )
};

export const VideoCourse = [page1, page2];