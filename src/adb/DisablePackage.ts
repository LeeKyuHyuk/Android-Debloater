import { promisify } from 'util';
import { exec } from 'child_process';
import Adb from './Adb';

const run = promisify(exec);

const DisablePackage = async (packageName: string): Promise<string> => {
  try {
    const { stdout } = await run(`${Adb()} shell "pm disable-user --user 0 ${packageName}"`);
    return stdout;
  } catch (error) {
    return 'An error occurred during disable.';
  }
};

export default DisablePackage;
