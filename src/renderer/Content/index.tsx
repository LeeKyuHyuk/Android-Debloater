import * as React from 'react';
import styled from '@emotion/styled';
import { PackageData } from '../../adb/GetPackages';
import { MODE } from '../App';
import Waiting from './Waiting';
import Connected from './Connected';
import Confirm from './Confirm';
import Run from './Run';

const ContentLayout = styled.div({
  backgroundColor: '#ffffff',
  height: 'calc(100% - 140px)',
});

type ContentProps = {
  findDevice: () => Promise<void>;
  deviceNumber: number;
  mode: MODE;
  setMode: React.Dispatch<React.SetStateAction<MODE>>;
  rowSelected: PackageData[];
  setRowSelected: React.Dispatch<React.SetStateAction<PackageData[]>>;
};

const Content = ({
  findDevice,
  deviceNumber,
  mode,
  setMode,
  rowSelected,
  setRowSelected,
}: ContentProps) => {
  React.useEffect(() => {
    if (mode === MODE.DEVICE_WAITING) findDevice();
  }, [mode]);

  return (
    <ContentLayout>
      {mode === MODE.DEVICE_WAITING && <Waiting deviceNumber={deviceNumber} setMode={setMode} />}
      {mode === MODE.DEVICE_CONNECTED && (
        <Connected rowSelected={rowSelected} setRowSelected={setRowSelected} />
      )}
      {mode === MODE.UNINSTALL_PACKAGE_CONFIRM && <Confirm rowSelected={rowSelected} />}
      {mode === MODE.UNINSTALL_PACKAGE_RUN && (
        <Run
          mode={mode}
          setMode={setMode}
          rowSelected={rowSelected}
          setRowSelected={setRowSelected}
        />
      )}
    </ContentLayout>
  );
};

export default Content;
