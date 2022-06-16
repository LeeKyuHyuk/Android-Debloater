import { promisify } from 'util';
import { exec } from 'child_process';
import Adb from './Adb';

const run = promisify(exec);

export const GetEnablePackages = async (): Promise<string[]> => {
  try {
    const data: string[] = [];
    const { stdout, stderr } = await run(`${Adb()} shell "pm list packages -e"`);
    if (stderr) return [stderr];
    const buffer = stdout.replaceAll('package:', '').split('\n');
    for (let index = 0; index < buffer.length - 1; index++) {
      const application = buffer[index].trim();
      if (application !== 'android' && application !== '') data.push(application);
    }
    data.sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
    return data;
  } catch (error) {
    return [error.toString()];
  }
};

export const GetDisablePackages = async (): Promise<string[]> => {
  try {
    const data: string[] = [];
    const { stdout, stderr } = await run(`${Adb()} shell "pm list packages -d"`);
    if (stderr) return [stderr];
    const buffer = stdout.replaceAll('package:', '').split('\n');
    for (let index = 0; index < buffer.length - 1; index++) {
      const application = buffer[index].trim();
      if (application !== 'android' && application !== '') data.push(application);
    }
    data.sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
    return data;
  } catch (error) {
    return [error.toString()];
  }
};
