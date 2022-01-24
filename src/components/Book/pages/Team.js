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
import {Portrait} from "./Portrat";

const assets = {
    teammates: [
        require("../../Alchemy/assets/team/dio.jpg"),
        require("../../Alchemy/assets/team/oleg.jpg"),
        require("../../Alchemy/assets/team/roma.jpg"),
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
  .portrait-wrapper {
    &:not(:first-child) {
      margin-top: 0.5rem;
    }
  }
`;

const MiniImg = styled.img`
  width: 0.6rem; 
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
                <Title fontSize={1.3}>About team</Title>
                <Paragraph fontSize={0.6}>
                    We are well aware, that for you as customer incredibly important quality product, opportunity adapt it for market as fast as possible, as well as important contractor adequacy.
                    We might have all of this, because we have strong expertise in all key development aspects,
                    including product analysis, programming, design and more.
                    Worked at Yandex, Wargaming, Nival, successful startups, opensource and freelance.
                </Paragraph>
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
                <Portrait src={assets.teammates[1]} name={"Oleg Karlovskiy"} position={"Senior Systems Engineer"}>
                    Entrepreneur, server distributed systems developer. Was a lead developer at some companies (Nival, Yandex, ...), startups (including startup which net worth was >2M$). Now I work at freelance with the best team in the world.
                </Portrait>
                <Portrait reverse={true} src={assets.teammates[0]} name={"Nikita Uranov"} position={"Senior Front-End Engineer"}>
                    I specialize in modern and widely-used technologies, such as:
                    Front-End Development (React, GraphQL, TypeScript). Worked at MTS, Yandex, etc. as Middle/Senior Engineer.
                    But now i really want write better code than code in those companies.
                </Portrait>
                <Portrait src={assets.teammates[2]} name={"Roman Krylov"} position={"Senior Back-End Engineer"}>
                    I've been working in some big companies — Sberbank, Taxcom, OZON, etc. Also i've worked at some companies in New&nbsp;York. One of my best projects where
                    i've been working: warehouse management system for one of OZON's new warehouses.
                    The development of this system was a high-priority project, as the effective WMS is crucial for the support of a growing throughput of company.
                </Portrait>
            </Inner>
        </Wrapper>
    );
};

export const Team = [page1, page2];