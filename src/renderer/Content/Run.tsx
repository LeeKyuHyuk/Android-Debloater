import * as React from 'react';
import styled from '@emotion/styled';
import { Button } from 'primereact/button';
import { PackageData } from '../../adb/GetPackages';
import UninstallPackage from '../../adb/UninstallPackage';
import { MODE } from '../App';

const Title = styled.h2({
  margin: '4px 10px',
  color: '#f44336',
  opacity: 0.87,
  display: 'inline',
});

type RunProps = {
  mode: MODE;
  setMode: React.Dispatch<React.SetStateAction<MODE>>;
  rowSelected: PackageData[];
  setRowSelected: React.Dispatch<React.SetStateAction<PackageData[]>>;
};

const Run = ({ mode, setMode, rowSelected, setRowSelected }: RunProps) => {
  const [processing, setProcessing] = React.useState<boolean>(false);
  const [uninstallLog, setUninstallLog] = React.useState<string>('');

  const runUninstallPackage = async () => {
    try {
      setProcessing(true);
      let logBuffer = '';
      for (let index = 0; index < rowSelected.length; index++) {
        const result = await UninstallPackage(String(rowSelected[index].name));
        logBuffer += `Uninstall '${String(rowSelected[index].name)}'...\n`;
        logBuffer += `↳ ${result}\n`;
        setUninstallLog(logBuffer);
      }
      logBuffer += 'Done!!!';
      setUninstallLog(logBuffer);
      setRowSelected([]);
      setProcessing(false);
    } catch (error) {
      console.error('An error occurred during operation.');
    }
  };

  React.useEffect(() => {
    if (mode === MODE.UNINSTALL_PACKAGE_RUN) runUninstallPackage();
  }, [mode]);

  return (
    <>
      <div
        style={{ overflow: 'auto', height: 'calc(100% - 64px)', width: '100%', padding: '16px' }}
      >
        {uninstallLog.split('\n').map((item, index) => {
          return (
            <div key={index}>
              {item}
              <br />
            </div>
          );
        })}
      </div>
      <div
        style={{
          height: '64px',
          width: '100%',
        }}
      >
        <Button
          style={{ float: 'right', margin: '14px 24px 0px 0px' }}
          label="Done"
          className="p-button-info"
          icon="pi pi-check"
          loading={processing}
          onClick={() => setMode(MODE.DEVICE_WAITING)}
        />
      </div>
    </>
  );
};

export default Run;
