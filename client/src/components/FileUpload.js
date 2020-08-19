import React, { Fragment, useState } from 'react'
import axios from 'axios'; 
import Message from './Message'
import Progress from './Progress'

import styled from "styled-components";


const Wrapper = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
text-align: center;
`;  

const Form = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;  

const InputUpload = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: 20px;
`;  

const Result = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`; 

export const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose file');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0)
  
  const onChange = e => {
    setFile(e.target.files[0]); //this is an array and we want the first file that was uploaded
    setFilename(e.target.files[0].name); 
  }

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file); //append betyder bifoga, så med andra ord lägger den till file

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );  

        //Clear percentage after 10 sek
        setTimeout(() => setUploadPercentage(0), 10000);
        }
      });

      const { fileName, filePath } = res.data;

      setUploadedFile ({ fileName, filePath });

      setMessage('File Uploaded');

    } catch(err) {
      if(err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
        
    }
  }
      
    return (
      <Fragment>

      <Wrapper>
        {message ? <Message msg={message} /> : null}

        <Form onSubmit={onSubmit}>
          <InputUpload>
            <input type="file" 
            id="customFile" 
            onChange={onChange}
            />
            <label 
              htmlFor="customFile">
            </label>
            <Progress percentage={uploadPercentage}/> 
          </InputUpload>

          <input 
            type="submit" 
            value="Upload" 
          />
        </Form> 

        { uploadedFile ? (
          <Result>
              <h3>
                {uploadedFile.fileName}
              </h3>
              <img 
                style={{ width: '100px' }} 
                src={uploadedFile.filePath} 
                alt=""/>
          </Result>
        ) : null }
      </Wrapper>    
      </Fragment>
    )
}
