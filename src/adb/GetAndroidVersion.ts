import { promisify } from 'util';
import { exec } from 'child_process';
import Adb from './Adb';

const run = promisify(exec);

const GetAndroidVersion = async (): Promise<string> => {
  try {
    const { stdout } = await run(`${Adb()} shell "getprop ro.build.version.release"`);
    return 'Android ' + stdout;
  } catch (error) {
    return 'N/A';
  }
};

export default GetAndroidVersion;
