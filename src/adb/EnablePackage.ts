import { promisify } from 'util';
import { exec } from 'child_process';
import Adb from './Adb';

const run = promisify(exec);

const EnablePackage = async (packageName: string): Promise<string> => {
  try {
    const { stdout } = await run(`${Adb()} shell "pm enable --user 0 ${packageName}"`);
    return stdout;
  } catch (error) {
    return 'An error occurred during enable.';
  }
};

export default EnablePackage;
