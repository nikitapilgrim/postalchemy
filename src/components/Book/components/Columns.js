import React from 'react';
import styled from "styled-components";

export const Column = styled.div`
  flex-basis: 50%;
  max-height: 100%;
  overflow-y: scroll;
  &:first-child {
      padding-right: 5%;
  } 
  &:last-child {
      max-height: 60%;
      padding-left: 5%;
  }
 
`;

export const Columns = styled.div`
  max-height: 100%;
  display: flex;
  justify-content: space-between;
`;