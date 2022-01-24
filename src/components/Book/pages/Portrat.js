import React from 'react';
import styled from "styled-components";
import {Title} from "../components/Title";
import {Paragraph} from "../components/Paragraph";


const PortraitWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  flex-direction: ${props => props.reverse ? `row-reverse` : `row`};
  @media (max-width: 500px) {
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

`;
const Card = styled.div`    
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-basis: 35%;
    flex-shrink: 0;
`;

const AvatarContainer = styled.div`
  flex-shrink: 0;
 
  @media (max-width: 500px) {
      border-radius: 0.5rem 0.5rem;
      overflow: hidden;
  }
  img {
    max-width: 100%;
    height: auto;
  }
`;

const NameContainer = styled(Title)`
  position: relative;
  text-align: center;
  color: #FFFFFF;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: 0.4rem;
  bottom: -0.3rem;
   
  @media (max-width: 500px) {
      font-size: 0.8rem;
      top: 0;
      &&& {
        padding: 0.3rem;
      }
  }
`;
const PositionContainer = styled(Title)`
  position: relative;
  bottom: -0.1rem;
  color: #FFFFFF;
  font-size: 0.3rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  @media (max-width: 500px) {
      font-size: 0.6rem;
      top: 0;
      &&& {
        padding: 0rem;
      }
  }
`;
const DescriptionContainer = styled(Paragraph)`
  flex-basis: 60%;
  flex-grow: 1;
  &&& {
    padding: 0;
    margin-left: 0.5rem;
    @media (max-width: 500px) {
     margin-left: 0;
    }
  }
  @media (max-width: 500px) {
    margin-top: 0.5rem;
  }

`;

const InfoContainer = styled.div`
  text-align: center;
  width: 100%;
  padding: 0.2rem;
  position: absolute;
  bottom: 0;
  background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%); 
`;

export const Portrait = ({src, name, position, children, reverse}) => {
    return (
        <PortraitWrapper className={'portrait-wrapper'} reverse={reverse}>
            <Card>
                <AvatarContainer>
                    <img alt={name} src={src}/>
                </AvatarContainer>
                <InfoContainer>
                    <NameContainer fontSize={0.8}>
                        {name}
                    </NameContainer>
                    <PositionContainer fontSize={0.6}>
                        {position}
                    </PositionContainer>
                </InfoContainer>
            </Card>
            <DescriptionContainer fontSize={0.6}>
                {children}
            </DescriptionContainer>

        </PortraitWrapper>
    )
};