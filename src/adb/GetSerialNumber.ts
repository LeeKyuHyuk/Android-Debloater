import { promisify } from 'util';
import { exec } from 'child_process';
import Adb from './Adb';

const run = promisify(exec);

const GetSerialNumber = async (): Promise<string> => {
  try {
    const { stdout } = await run(`${Adb()} get-serialno`);
    return stdout.trim();
  } catch (error) {
    return '';
  }
};

export default GetSerialNumber;
