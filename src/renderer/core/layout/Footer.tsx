import * as React from 'react';
import { styled } from '@stitches/react';
import { BLACK_TEXT } from '../../constants/colors';

const FooterText = styled('p', {
  color: BLACK_TEXT,
  display: 'inline',
});

const Footer = () => {
  return <FooterText>Android Debloater ©2022 by KyuHyuk Lee</FooterText>;
};

export default Footer;
