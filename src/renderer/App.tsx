import * as React from 'react';
import styled from '@emotion/styled';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import GetDeviceNumber from '../adb/GetDeviceNumber';
import { PackageData } from '../adb/GetPackages';

export enum MODE {
  DEVICE_WAITING,
  DEVICE_CONNECTED,
  UNINSTALL_PACKAGE_CONFIRM,
  UNINSTALL_PACKAGE_RUN,
}

type UninstallPackage = {
  name: string;
  apk: string;
};

export type AndroidDebloater = {
  application: string;
  version: string;
  uninstall: UninstallPackage[];
};

const AppLayout = styled.div({
  height: '100vh',
  backgroundColor: '#f0f2f5',
});

const App = () => {
  const [mode, setMode] = React.useState<MODE>(MODE.DEVICE_WAITING);
  const [deviceNumber, setDeviceNumber] = React.useState<number>(0);
  const [rowSelected, setRowSelected] = React.useState<PackageData[]>([]);

  const findDevice = async () => {
    setDeviceNumber(await GetDeviceNumber());
  };

  return (
    <AppLayout>
      <Header
        findDevice={findDevice}
        mode={mode}
        setMode={setMode}
        rowSelected={rowSelected}
        setRowSelected={setRowSelected}
      />
      <Content
        findDevice={findDevice}
        deviceNumber={deviceNumber}
        mode={mode}
        setMode={setMode}
        rowSelected={rowSelected}
        setRowSelected={setRowSelected}
      />
      <Footer />
    </AppLayout>
  );
};

export default App;
