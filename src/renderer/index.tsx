import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import 'antd/dist/antd.css';
import '../css/App.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
