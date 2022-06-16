import * as React from 'react';
import { useRecoilState } from 'recoil';
import { appState } from '../constants/atoms';
import EnablePackage from '../../adb/EnablePackage';
import DisablePackage from '../../adb/DisablePackage';
import UninstallPackage from '../../adb/UninstallPackage';
import { MODE, OPERATION, REMOVE_MODE } from '../constants/types';
import Button from '../core/Button';

const Run = () => {
  const [state, setState] = useRecoilState(appState);
  const [processing, setProcessing] = React.useState<boolean>(false);
  const [uninstallLog, setLog] = React.useState<string>('');

  const runDisablePackage = async () => {
    try {
      setProcessing(true);
      let logBuffer = '';
      for (let index = 0; index < state.selected.length; index++) {
        const result = await DisablePackage(String(state.selected[index]));
        logBuffer += `Disable '${String(state.selected[index])}'...\n`;
        logBuffer += `↳ ${result}\n`;
        setLog(logBuffer);
      }
      logBuffer += 'Done!!!';
      setLog(logBuffer);
      setProcessing(false);
      setState({ ...state, selected: [] });
    } catch (error) {
      console.error('An error occurred during operation.');
    }
  };

  const runUninstallPackage = async () => {
    try {
      setProcessing(true);
      let logBuffer = '';
      for (let index = 0; index < state.selected.length; index++) {
        const result = await UninstallPackage(String(state.selected[index]));
        logBuffer += `Uninstall '${String(state.selected[index])}'...\n`;
        logBuffer += `↳ ${result}\n`;
        setLog(logBuffer);
      }
      logBuffer += 'Done!!!';
      setLog(logBuffer);
      setProcessing(false);
      setState({ ...state, selected: [] });
    } catch (error) {
      console.error('An error occurred during operation.');
    }
  };

  const runEnablePackage = async () => {
    try {
      setProcessing(true);
      let logBuffer = '';
      for (let index = 0; index < state.selected.length; index++) {
        const result = await EnablePackage(String(state.selected[index]));
        logBuffer += `Enable '${String(state.selected[index])}'...\n`;
        logBuffer += `↳ ${result}\n`;
        setLog(logBuffer);
      }
      logBuffer += 'Done!!!';
      setLog(logBuffer);
      setProcessing(false);
      setState({ ...state, selected: [] });
    } catch (error) {
      console.error('An error occurred during operation.');
    }
  };

  React.useEffect(() => {
    if (state.mode === MODE.UNINSTALL_PACKAGE_RUN) {
      if (state.operation === OPERATION.DELETE) {
        if (state.removeMode === REMOVE_MODE.DISABLE) {
          runDisablePackage();
        }
        if (state.removeMode === REMOVE_MODE.UNINSTALL) {
          runUninstallPackage();
        }
      }
      if (state.operation === OPERATION.INSTALL) {
        runEnablePackage();
      }
    }
  }, [state.mode]);

  return (
    <>
      <div
        style={{ overflow: 'auto', height: 'calc(100% - 70px)', width: '100%', padding: '16px' }}
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
          marginTop: '6px',
          height: '64px',
          width: '100%',
          textAlign: 'right',
        }}
      >
        <Button
          type="Main"
          disable={processing}
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
          Done
        </Button>
      </div>
    </>
  );
};

export default Run;
