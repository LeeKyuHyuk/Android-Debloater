import { promisify } from 'util';
import { exec } from 'child_process';
import Adb from './Adb';

const run = promisify(exec);

const KillServer = async (): Promise<Boolean> => {
  try {
    await run(`${Adb()} kill-server`);
    return true;
  } catch (error) {
    return false;
  }
};

export default KillServer;
