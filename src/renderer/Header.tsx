import * as React from 'react';
import { message } from 'antd';
import { dialog } from '@electron/remote';
import * as fs from 'fs';
import { styled } from '@stitches/react';
import GetDeviceName from '../adb/GetDeviceName';
import GetSerialNumber from '../adb/GetSerialNumber';
import GetDeviceNumber from '../adb/GetDeviceNumber';
import Button from './core/Button';
import Title from './core/Title';
import Subtitle from './core/layout/Subtitle';
import { useRecoilState } from 'recoil';
import { appState } from './constants/atoms';
import { AndroidDebloater, MODE, OPERATION, REMOVE_MODE } from './constants/types';

const ControlPanel = styled('div', {
  textAlign: 'right',
  verticalAlign: 'middle',
});

const Header = () => {
  const [state, setState] = useRecoilState(appState);

  const findDevice = async () => {
    setState({ ...state, deviceNumber: await GetDeviceNumber() });
  };

  const updateDevice = async () => {
    setState({
      ...state,
      deviceName: await GetDeviceName(),
      serialNumber: await GetSerialNumber(),
    });
  };

  const importData = async () => {
    await dialog
      .showOpenDialog({
        title: 'Import uninstall package list',
        properties: ['openFile'],
        filters: [{ name: 'Android Debloater Data File', extensions: ['json'] }],
      })
      .then((result) => {
        if (!result.canceled) {
          if (result.filePaths.length === 1)
            fs.readFile(result.filePaths[0], 'utf8', (error, data) => {
              if (error) console.error(error);
              if (data) {
                const dataObject: AndroidDebloater = JSON.parse(data);
                setState({ ...state, selected: dataObject.uninstall });
              }
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const exportData = async () => {
    await dialog
      .showSaveDialog({
        title: 'Export uninstall package list',
        filters: [{ name: 'Android Debloater Data File', extensions: ['json'] }],
      })
      .then((result) => {
        if (!result.canceled) {
          const data: AndroidDebloater = {
            application: 'Android Debloater',
            version: '1.0.2',
            uninstall: state.selected,
          };
          if (result.filePath)
            fs.writeFile(result.filePath, JSON.stringify(data, null, 4), (error) => {
              if (error) console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    if (state.mode === MODE.DEVICE_CONNECTED) {
      updateDevice();
    }
  }, [state.mode]);

  return (
    <>
      <div style={{ paddingTop: '6px' }}>
        {state.mode === MODE.DEVICE_WAITING ? (
          <Title>Device Connect</Title>
        ) : (
          <>
            <Title>{state.deviceName}</Title>
            <Subtitle>{state.serialNumber}</Subtitle>
          </>
        )}
      </div>
      <ControlPanel>
        {state.mode === MODE.DEVICE_WAITING && (
          <Button type={state.deviceNumber !== 1 ? 'Main' : 'Sub'} onClick={findDevice}>
            Refresh
          </Button>
        )}
        {state.mode === MODE.DEVICE_CONNECTED && (
          <>
            <Button type="Sub" onClick={importData}>
              Import
            </Button>
            <Button
              type="Sub"
              onClick={() =>
                setState({
                  ...state,
                  mode: MODE.DEVICE_WAITING,
                  operation: OPERATION.DELETE,
                  removeMode: REMOVE_MODE.DISABLE,
                  selected: [],
                })
              }
            >
              Disconnect
            </Button>
            <Button
              type="Main"
              onClick={() =>
                state.selected.length === 0
                  ? message.error('Please select the package to delete')
                  : setState({ ...state, mode: MODE.UNINSTALL_PACKAGE_CONFIRM })
              }
            >
              Run
            </Button>
          </>
        )}
        {state.mode === MODE.UNINSTALL_PACKAGE_CONFIRM && (
          <>
            <Button type="Sub" onClick={exportData}>
              Export
            </Button>
            <Button
              type="Sub"
              onClick={() =>
                setState({
                  ...state,
                  mode: MODE.DEVICE_WAITING,
                  operation: OPERATION.DELETE,
                  removeMode: REMOVE_MODE.DISABLE,
                  selected: [],
                })
              }
            >
              Cancel
            </Button>
            <Button
              type="Main"
              onClick={() => setState({ ...state, mode: MODE.UNINSTALL_PACKAGE_RUN })}
            >
              Run
            </Button>
          </>
        )}
      </ControlPanel>
    </>
  );
};

export default Header;
