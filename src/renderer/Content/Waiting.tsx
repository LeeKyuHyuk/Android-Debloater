import * as React from 'react';
import { useRecoilState } from 'recoil';
import { styled } from '@stitches/react';
import { appState } from '../constants/atoms';
import Title from '../core/Title';
import Subtitle from '../core/layout/Subtitle';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import Button from '../core/Button';
import { MODE } from '../constants/types';

const Layout = styled('div', {
  display: 'grid',
  placeItems: 'center',
  padding: '20% 0px',
});

const Waiting = () => {
  const [state, setState] = useRecoilState(appState);

  return (
    <>
      {state.deviceNumber === 0 && (
        <Layout>
          <CloseCircleTwoTone twoToneColor="#F44336" style={{ fontSize: '5em', padding: '15px' }} />
          <Title>Android device is not connected!</Title>
          <Subtitle>Check the connection and click the 'Refresh' button.</Subtitle>
        </Layout>
      )}
      {state.deviceNumber > 1 && (
        <Layout>
          <CloseCircleTwoTone twoToneColor="#F44336" style={{ fontSize: '5em', padding: '15px' }} />
          <Title>Two or more Android devices are connected!</Title>
          <Subtitle>
            Please connect only one Android device and Click the 'Refresh' button.
          </Subtitle>
        </Layout>
      )}
      {state.deviceNumber === 1 && (
        <Layout>
          <CheckCircleTwoTone twoToneColor="#4CAF50" style={{ fontSize: '5em', padding: '15px' }} />
          <Title>Connected with Android device!</Title>
          <Subtitle style={{ marginBottom: '20px' }}>
            Please allow USB debugging on your Android device.
          </Subtitle>
          <Button type="Main" onClick={() => setState({ ...state, mode: MODE.DEVICE_CONNECTED })}>
            Connect
          </Button>
        </Layout>
      )}
    </>
  );
};

export default Waiting;
