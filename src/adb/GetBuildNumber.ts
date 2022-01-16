import { promisify } from 'util';
import { exec } from 'child_process';
import Adb from './Adb';

const run = promisify(exec);

const GetBuildNumber = async (): Promise<string> => {
  try {
    const { stdout } = await run(`${Adb()} shell "getprop ro.build.display.id"`);
    return stdout;
  } catch (error) {
    return 'N/A';
  }
};

export default GetBuildNumber;
