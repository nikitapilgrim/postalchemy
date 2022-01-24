import React from 'react';
import styled, {css} from "styled-components";
import {Title} from "./Title";
import {Paragraph} from "./Paragraph";

const Wrapper = styled.ul`
    margin: 0;
    padding: 0;
`;

const Li = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
  
`;


export const List = ({data, className}) => {
    return (
        <Wrapper className={className}>
            {data.map((elem, i) => {
                return (
                    <Li key={i}>
                        <Title level={4} fontSize={0.69999}>{elem.title}</Title>
                        <Paragraph fontSize={0.6}>{elem.text}</Paragraph>
                    </Li>
                );
            })}
        </Wrapper>
    );
};