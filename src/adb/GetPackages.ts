import { promisify } from 'util';
import { exec } from 'child_process';
import Adb from './Adb';

const run = promisify(exec);

export interface PackageData {
  key: string;
  name: string;
  apk: string;
}

const GetPackages = async (): Promise<PackageData[]> => {
  try {
    const data: PackageData[] = [];
    const { stdout, stderr } = await run(`${Adb()} shell "pm list packages -f"`);
    if (stderr) return [{ key: '-1', name: stderr, apk: '' }];
    const buffer = stdout.replaceAll('package:', '').split('\n');
    for (let index = 0; index < buffer.length - 1; index++) {
      const application = buffer[index].split('=');
      if (application[1] !== 'android' && application[1] !== '')
        data.push({
          key: application[1].trim(),
          name: application[1].trim(),
          apk: application[0].trim(),
        });
    }
    data.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    return data;
  } catch (error) {
    return [{ key: '-1', name: error.toString(), apk: '' }];
  }
};

export default GetPackages;
