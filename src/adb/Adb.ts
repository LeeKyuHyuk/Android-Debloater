import { join } from 'path';
import { app } from '@electron/remote';

const Adb = () => {
  if (process.platform === 'linux')
    return join(app.getAppPath() + '.unpacked', '/adb').replace(/ /g, '\\ ');
  if (process.platform === 'darwin')
    return join(app.getAppPath() + '.unpacked', '/adb').replace(/ /g, '\\ ');
  return join(app.getAppPath() + '.unpacked', '\\adb.exe').replace(/ /g, '\\ ');
};

export default Adb;
