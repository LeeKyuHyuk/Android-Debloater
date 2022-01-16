import * as React from 'react';
import { dialog } from '@electron/remote';
import * as fs from 'fs';
import styled from '@emotion/styled';
import { Button } from 'primereact/button';
import { AndroidDebloater, MODE } from './App';
import Title from './Title';
import Subtitle from './Subtitle';
import GetDeviceName from '../adb/GetDeviceName';
import GetSerialNumber from '../adb/GetSerialNumber';
import { PackageData } from '../adb/GetPackages';

const HeaderLayout = styled.div({
  height: '80px',
  margin: '0px 0px 1px 0px',
  padding: 16,
  boxShadow: '0px 1px 0px 0px #e2e2e2',
  backgroundColor: '#ffffff',
});

const ControlPanel = styled.div({
  textAlign: 'right',
  display: 'table-cell',
  verticalAlign: 'middle',
});

const ControlButton = styled(Button)({
  display: 'inline-block',
});

type HeaderProps = {
  findDevice: () => Promise<void>;
  mode: MODE;
  setMode: React.Dispatch<React.SetStateAction<MODE>>;
  rowSelected: PackageData[];
  setRowSelected: React.Dispatch<React.SetStateAction<PackageData[]>>;
};

const Header = ({ findDevice, mode, setMode, rowSelected, setRowSelected }: HeaderProps) => {
  const [deviceName, setDeviceName] = React.useState<string>('Loading...');
  const [serialNumber, setSerialNumber] = React.useState<string>('');

  const updateDeviceName = async () => {
    setDeviceName(await GetDeviceName());
  };

  const updateSerialNumber = async () => {
    setSerialNumber(await GetSerialNumber());
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
                setRowSelected(
                  dataObject.uninstall.map((item) => {
                    return { key: item.name, name: item.name, apk: item.apk };
                  }),
                );
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
            version: '1.0.1',
            uninstall: rowSelected.map((item) => {
              return { name: item.name, apk: item.apk };
            }),
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
    if (mode === MODE.DEVICE_CONNECTED) {
      updateDeviceName();
      updateSerialNumber();
    }
  }, [mode]);

  return (
    <HeaderLayout className="grid">
      <div className="col-7" style={{ paddingTop: '12px' }}>
        {mode === MODE.DEVICE_WAITING ? (
          <Title>Device Connect</Title>
        ) : (
          <>
            <Title>{deviceName}</Title>
            <Subtitle>{serialNumber}</Subtitle>
          </>
        )}
      </div>
      <ControlPanel className="col-5">
        {mode === MODE.DEVICE_WAITING && (
          <ControlButton
            label="Refresh"
            className="p-button-outlined p-button-text p-button-plain"
            icon="pi pi-refresh"
            onClick={findDevice}
          />
        )}
        {mode === MODE.DEVICE_CONNECTED && (
          <>
            <Button
              label="Import"
              className="p-button-outlined p-button-text p-button-plain"
              icon="pi pi-file"
              onClick={importData}
            />
            <Button
              style={{ margin: '0px 8px' }}
              label="Run"
              className="p-button-success"
              icon="pi pi-play"
              onClick={() => setMode(MODE.UNINSTALL_PACKAGE_CONFIRM)}
            />
            <ControlButton
              label="Disconnect"
              className="p-button-danger"
              icon="pi pi-sign-out"
              onClick={() => setMode(MODE.DEVICE_WAITING)}
            />
          </>
        )}
        {mode === MODE.UNINSTALL_PACKAGE_CONFIRM && (
          <>
            <Button
              label="Export"
              className="p-button-outlined p-button-text p-button-plain"
              icon="pi pi-upload"
              onClick={exportData}
            />
            <ControlButton
              style={{ margin: '0px 8px' }}
              label="Cancel"
              className="p-button-danger"
              icon="pi pi-times"
              onClick={() => setMode(MODE.DEVICE_WAITING)}
            />
            <Button
              label="Run"
              className="p-button-success"
              icon="pi pi-play"
              onClick={() => setMode(MODE.UNINSTALL_PACKAGE_RUN)}
            />
          </>
        )}
      </ControlPanel>
    </HeaderLayout>
  );
};

export default Header;
