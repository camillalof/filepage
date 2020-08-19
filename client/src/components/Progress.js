import React from 'react'
import PropTypes from 'prop-types'

import styled from "styled-components";

const Wrapper = styled.section`
display: flex;
justify-content: center;
background-color: #d8d8d8;
border-radius: 20px;
height: 30px;
width: 300px;
`;  

const ProgressBar = styled.div`
border-radius: 20px;
height: 100%;
width: 0;
background: linear-gradient(to left, #F2709C, #FF9472);
box-shadow: 0 3px 3px -5px, 0 2px 5px #F2709C;
opacity: 0;
`;  

const Progress = ({ percentage }) => {
    const [style, setStyle] = React.useState({});

    setTimeout(() => {
      const newStyle = {
        opacity: 1,
        width:`${percentage}`,
      }

      setStyle(newStyle);
    }, 1000);

    return (
      <Wrapper>
        <ProgressBar
          className="progress-done" 
          role="progressbar" 
          style={{ 
            opacity: 1,  
            width: `${percentage}%` 
            }}>
            {percentage}%
        </ProgressBar>
      </Wrapper>
    )
}

Progress.propTypes = {
  percentage: PropTypes.number.isRequired,
}

export default Progress
