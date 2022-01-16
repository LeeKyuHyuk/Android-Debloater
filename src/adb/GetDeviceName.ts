import { promisify } from 'util';
import { exec } from 'child_process';
import Adb from './Adb';

const run = promisify(exec);

const GetDeviceName = async (): Promise<string> => {
  try {
    const { stdout } = await run(`${Adb()} shell "getprop ro.product.model"`);
    return stdout.trim();
  } catch (error) {
    return 'Device connection failure';
  }
};

export default GetDeviceName;
