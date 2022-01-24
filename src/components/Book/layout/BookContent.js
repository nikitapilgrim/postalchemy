import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  padding: 7%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const BookContent = ({children}) => {

    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
};