import React from 'react';

import {  Container } from './styles';

import { BsQuestion } from 'react-icons/bs';
import { ImQuotesLeft } from 'react-icons/im';
import Loading from '../Loading';

const themeDeactivated = {
  height: '0vh',
  displayIcon: 'none',
}

export default function LoadingLayer(
    { loading }: any
    ) {
  return (
    <Container theme={ !loading && themeDeactivated }>
      <Loading loading={loading}/>
    </Container>
  );
}

