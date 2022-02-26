/** @format */

import React from 'react';
import styled from 'styled-components';

const DefaultMessage = () => {
  return (
    <Wrapper>
      <section className='section-center'>
        <h4 className='info'>Enter GitHub username to find out his/her stats.</h4>
        <h4 className='info'>You are limited to 60 requests per hour. The limit is set based on your IP address</h4>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .info {
    text-transform: none;
  }
`;

export default DefaultMessage;
