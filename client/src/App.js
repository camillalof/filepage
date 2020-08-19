import React, { useState } from 'react'
import { FileUpload } from './components/FileUpload'
import Message from '../src/components/Message'
import { ReactComponent as Upload } from './components/Upload.svg';
import './App.css';

import styled from "styled-components";

const Wrapper = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
padding: 10px;
`;  

const Icon = styled.svg`
width: 50px;
height: auto;
padding-right: 5px;
`; 

const TitleIcon = styled.span`
display: flex;
flex-direction: row;
justify-content: center;
`; 

const Title = styled.h1`
  color: black;
`;  


export const App = () => {
  const [message, setMessage] = useState('');

  return (
    <Wrapper>
        <TitleIcon>
          <Title>
            <Icon>
              <Upload/>
            </Icon>
            {message ? <Message msg={message} /> : 'Upload your file'}
          </Title>
        </TitleIcon>
      <FileUpload/>
    </Wrapper>
  )
};
