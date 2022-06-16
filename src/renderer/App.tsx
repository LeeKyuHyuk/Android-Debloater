import * as React from 'react';
import { Layout } from 'antd';
import { styled } from '@stitches/react';
import Header from './Header';
import Content from './Content';
import Footer from './core/layout/Footer';

const AppLayout = styled(Layout, {
  height: '100vh',
  backgroundColor: '#f0f2f5',
});

const HeaderLayout = styled(Layout.Header, {
  height: 'auto',
  padding: '12px',
  lineHeight: '27px',
  boxShadow: '0px 1px 0px 0px #e2e2e2',
  backgroundColor: '#ffffff',
  display: 'flex',
  justifyContent: 'space-between',
  zIndex: 1,
});

const FooterLayout = styled(Layout.Footer, {
  textAlign: 'center',
});

const { Content: ContentLayout } = Layout;

const App = () => {
  return (
    <AppLayout>
      <HeaderLayout>
        <Header />
      </HeaderLayout>
      <ContentLayout>
        <Content />
      </ContentLayout>
      <FooterLayout>
        <Footer />
      </FooterLayout>
    </AppLayout>
  );
};

export default App;
