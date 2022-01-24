import React from 'react';
import styled from "styled-components";

export const Paragraph = styled.p`
  font-size: ${props => `${props.fontSize}rem` || '1rem'};
  color: ${props => props.theme.p || ``};
  margin: 0;
  padding: 0;
  padding-top: ${props => `${props.fontSize}rem` || '1rem'};
  padding-bottom: ${props => `${props.fontSize}rem` || '1rem'};
  a {
    color: ${props => `${props.theme.l || '#9c2e84'}`};
  }
`;