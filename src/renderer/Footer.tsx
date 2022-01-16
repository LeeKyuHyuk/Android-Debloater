import * as React from 'react';
import styled from '@emotion/styled';

const FooterLayout = styled.div({
  height: '59px',
  padding: '20px',
  textAlign: 'center',
});

const FooterText = styled.p({
  color: '#000000',
  opacity: 0.87,
  display: 'inline',
});

const Footer = () => {
  return (
    <FooterLayout>
      <FooterText>Android Debloater ©2022 by KyuHyuk Lee</FooterText>
    </FooterLayout>
  );
};

export default Footer;
