import { promisify } from 'util';
import { exec } from 'child_process';
import Adb from './Adb';

const run = promisify(exec);

const GetDeviceNumber = async (): Promise<number> => {
  try {
    const { stdout } = await run(`${Adb()} devices`);
    const deviceNumber = stdout.trim().split('\n').length - 1;
    return deviceNumber;
  } catch (error) {
    return 0;
  }
};

export default GetDeviceNumber;
