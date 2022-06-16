import { atom } from 'recoil';
import { MODE, OPERATION, REMOVE_MODE } from './types';

type AppState = {
  mode: MODE;
  operation: OPERATION;
  removeMode: REMOVE_MODE;
  deviceNumber: number;
  deviceName: string;
  serialNumber: string;
  selected: string[];
};

export const appState = atom<AppState>({
  key: 'appState',
  default: {
    mode: MODE.DEVICE_WAITING,
    operation: OPERATION.DELETE,
    removeMode: REMOVE_MODE.DISABLE,
    deviceNumber: 0,
    deviceName: 'Loading...',
    serialNumber: '',
    selected: [],
  },
});
