import React from 'react';

import {  Container } from './styles';

import { BsQuestion } from 'react-icons/bs';
import { ImQuotesLeft } from 'react-icons/im';

const themeDeactivated = {
  displayIcon: 'none',
}

export default function Loading(
    { loading }: any
    ) {
  return (

    <Container theme={ !loading && themeDeactivated }>
      <div className="loading-spinner"/>
    </Container>
  );
}

