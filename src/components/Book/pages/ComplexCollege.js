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
    college: [
        require("../assets/college1.png"),
        require("../assets/college2.png"),
        require("../assets/college3.png"),
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
                <Title fontSize={1.3}>Complex school solution</Title>
                <Paragraph fontSize={0.6}>
                    <dl>
                        <dt><b>Clients:</b> Some schools (more in description)</dt>
                        <dt><b>Status:</b> Still in support development</dt>
                        <dt><b>Links:</b> <a target={'_blank'} href={'https://easyedu.su/'}>More</a></dt>
                    </dl>
                    Was developed a SaaS administration panel, a cross-platform application for Android, iOS. We've been creating a mailing
                    system, also released some features like compiling a list, sharing homework, etc...
                </Paragraph>
                <ImageContainer className={"imageContainer"}>
                    <img src={assets.college[0]} alt=""/>
                </ImageContainer>


            </Inner>
        </Wrapper>
    );
};

const page2 = () => {
    return (
        <Wrapper color={'green'}>
            <Inner>
                <Paragraph fontSize={0.6}>


                    The system is made for 4 colleges. Academy of transport technologies(2000 students), Saint
                    Petersburg Polytechnic College of Urban Economics(1300 students), Technical College of Management
                    and commerce (600 students), North-West Institute of Management, RANEPA (600 students).

                    Also, we had created subscription management, payroll for employees, statistics system, personal dashboards for
                    employees and students. Convenient editors for this and all of rest in the browser.
                </Paragraph>
                <ImageContainer className={"imageContainer"}>
                    <img src={assets.college[1]} alt=""/>
                </ImageContainer>


            </Inner>
        </Wrapper>
    );
};

export const ComplexCollege = [page1, page2];