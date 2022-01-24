import React from 'react';
import styled, {css} from "styled-components";
import {Title} from "../components/Title";
import {Wrapper} from "../components/PageWrapper";

const assets = {
    college: [
        require("../assets/college1.png"),
        require("../assets/college2.png"),
        require("../assets/college3.png"),
    ]
};
const cssMobile = css`
    &&& {
      padding: 0;
      & > div {
        padding: 0;
      }
    }
`;

const CustomWrapper = styled(Wrapper)`
      ${props => props.theme.t && cssMobile }
  
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    li {
        list-style: none;
        margin: 0;
        padding: 0;
        &:not(:first-child) {
          margin-top: 0.5rem;
        }
    }
    a {
       text-decoration: none;
    }
    h3 {
      color: ${props => props.theme.t || `#000`};
      text-decoration: none;
      margin: 0.2rem 0;
      font-size: 0.8rem;
    }
    mark {
      color: ${props => props.theme.t || ``};
      background: none;
      text-decoration: underline;
      font-size: 0.7rem;
    }
`;

const CustomList = () => {

    return (
        <List>
            <li><a href="tg://resolve?domain=nikitapilgrim" itemProp="telegram" rel="me">
                <h3>Telegram</h3>
                <mark>@postalchemy</mark>
            </a></li>
            <li><a href="mailto:postalchemy@hotmail.com" itemProp="email"><
                h3>Mail</h3>
                <mark>postalchemy@hotmail.com</mark>
            </a></li>
        </List>
    )
};

const T = styled(Title)`
  display: ${props => props.theme.p ? 'none' : 'block'};
`;



const Inner = styled.div`
  position: relative;
  padding: ${props => props.theme.p ? 0 : `0.5rem`};
  &:after {
      content: "";
      clear: both;
      display: table;
  }
`;

const contacts = [
    {
        title: 'telegram',
        text: '@postaclhemy'
    }
];

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
        <CustomWrapper color={'green'}>
            <Inner>
                <T fontSize={1.3}>Contacts</T>
                <CustomList/>
            </Inner>
        </CustomWrapper>
    );
};

export const Contact = page1;