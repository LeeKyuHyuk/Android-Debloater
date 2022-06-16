export enum MODE {
  DEVICE_WAITING,
  DEVICE_CONNECTED,
  UNINSTALL_PACKAGE_CONFIRM,
  UNINSTALL_PACKAGE_RUN,
}

export enum OPERATION {
  DELETE,
  INSTALL,
}

export enum REMOVE_MODE {
  DISABLE,
  UNINSTALL,
}

export type AndroidDebloater = {
  application: string;
  version: string;
  uninstall: string[];
};
