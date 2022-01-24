import React from 'react';
import styled, {css} from "styled-components";

const global = css`
  margin: 0;
  padding: 0;
  font-family: ${props => props.theme.t ? 'inherit' : 'Auldroon'};;
  color: ${props => props.theme.t || ``};
  padding-top: ${props => `${props.fontSize / 5}rem` || '1rem'};
  padding-bottom: ${props => `${props.fontSize / 5}rem` || '1rem'};
`;

const T = styled.h1`
  ${global};
  font-size: ${props => `${props.fontSize}rem` || '1rem'};
`;

const T2 = styled.h2`
  ${global};
  font-size: ${props => `${props.fontSize}rem` || '0.9rem'};
`;

const T3 = styled.h3`
  ${global};
  font-size: ${props => `${props.fontSize}rem` || '0.8rem'};
`;

const T4 = styled.h4`
  ${global};
  font-size: ${props => `${props.fontSize}rem` || '0.7rem'};
`;


export const Title = (props, {level = 1}) => {
    return (
        <>
            {level === 1 && <T {...props}/>}
            {level === 2 && <T2 {...props}/>}
            {level === 3 && <T3 {...props}/>}
            {level === 4 && <T4 {...props}/>}
        </>
    );
};