import * as React from 'react';
import { useRecoilState } from 'recoil';
import { styled } from '@stitches/react';
import { appState } from '../constants/atoms';
import { WHITE } from '../constants/colors';
import GetDeviceNumber from '../../adb/GetDeviceNumber';
import { MODE } from '../constants/types';
import Waiting from './Waiting';
import Packages from './Packages';
import Confirm from './Confirm';
import Run from './Run';

const ContentLayout = styled('div', {
  backgroundColor: WHITE,
  height: 'calc(100%)',
});

const Content = () => {
  const [state, setState] = useRecoilState(appState);

  const findDevice = async () => {
    setState({ ...state, deviceNumber: await GetDeviceNumber() });
  };

  React.useEffect(() => {
    if (state.mode === MODE.DEVICE_WAITING) findDevice();
  }, [state.mode]);

  return (
    <ContentLayout>
      {state.mode === MODE.DEVICE_WAITING && <Waiting />}
      {state.mode === MODE.DEVICE_CONNECTED && <Packages />}
      {state.mode === MODE.UNINSTALL_PACKAGE_CONFIRM && <Confirm />}
      {state.mode === MODE.UNINSTALL_PACKAGE_RUN && <Run />}
    </ContentLayout>
  );
};

export default Content;
