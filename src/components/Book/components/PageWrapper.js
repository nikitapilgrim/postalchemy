import React, {useEffect, useRef, useContext, useMemo, useState} from 'react';

import styled, {css} from "styled-components";
import pageLeft from '../../Alchemy/assets/book/rightp.png';
import pageRight from '../../Alchemy/assets/book/leftp.png';
import {TurnContext} from "./Turn";
import {YoutubeContext} from "./Youtube";
import useStore from "../../Three/store";

export const Wrapper = styled.div`
    background: url(${props => props.background});
    background-size: cover;
    height: 100%;
    width: 100%;
    & > div {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 0.5rem;
      padding-bottom: 0.8rem;
    }
`;


export const PageWrapper = ({articles}) => {
    const turn = useContext(TurnContext);
    const actions = useStore(state => state.actions);
    const renderPages = useMemo(() => articles.reduce((_, article, i) => [..._, ...article], []), [articles]);


    useEffect(() => {
        actions.setLastPage(renderPages.length + 1);
    }, [renderPages.length]);
    return (
        <>
            <Wrapper background={pageRight}/>
            {renderPages.map((Page, i) => {
                const count = i + 1;
                const index = i + 2;
                return (
                    <Wrapper key={i} background={count & 1 ? pageLeft : pageRight}>
                        <YoutubeContext.Provider value={{turn, index}}>
                            <Page/>
                        </YoutubeContext.Provider>
                    </Wrapper>
                );
            })}
        </>
    );
};

