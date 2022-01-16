import { join } from 'path';
import { app } from '@electron/remote';

const Adb = () => {
  if (process.platform === 'linux') return join(app.getAppPath() + '.unpacked', '/adb');
  if (process.platform === 'darwin') return join(app.getAppPath() + '.unpacked', '/adb');
  return join(app.getAppPath() + '.unpacked', '\\adb.exe');
};

export default Adb;
