import * as React from 'react';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { MODE } from '../App';
import Title from '../Title';
import Subtitle from '../Subtitle';

type WaitingProps = {
  deviceNumber: number;
  setMode: React.Dispatch<React.SetStateAction<MODE>>;
};

const Waiting = ({ deviceNumber, setMode }: WaitingProps) => {
  return (
    <>
      {deviceNumber === 0 && (
        <div style={{ display: 'grid', placeItems: 'center', padding: '20% 0px' }}>
          <Avatar
            icon="pi pi-times"
            className="p-mr-2"
            size="xlarge"
            shape="circle"
            style={{ backgroundColor: '#f44336', color: '#ffffff', marginBottom: '16px' }}
          />
          <Title>Android device is not connected!</Title>
          <Subtitle>Check the connection and click the 'Refresh' button.</Subtitle>
        </div>
      )}
      {deviceNumber > 1 && (
        <div style={{ display: 'grid', placeItems: 'center', padding: '20% 0px' }}>
          <Avatar
            icon="pi pi-times"
            className="p-mr-2"
            size="xlarge"
            shape="circle"
            style={{ backgroundColor: '#f44336', color: '#ffffff', marginBottom: '16px' }}
          />
          <Title>Two or more Android devices are connected!</Title>
          <Subtitle>
            Please connect only one Android device and Click the 'Refresh' button.
          </Subtitle>
        </div>
      )}
      {deviceNumber === 1 && (
        <div style={{ display: 'grid', placeItems: 'center', padding: '20% 0px' }}>
          <Avatar
            icon="pi pi-check"
            className="p-mr-2"
            size="xlarge"
            shape="circle"
            style={{ backgroundColor: '#4caf50', color: '#ffffff', marginBottom: '16px' }}
          />
          <Title>Connected with Android device!</Title>
          <Subtitle>Please allow USB debugging on your Android device.</Subtitle>
          <Button
            label="Connect"
            className="p-button-rounded p-button-info"
            style={{ marginTop: '16px' }}
            onClick={() => setMode(MODE.DEVICE_CONNECTED)}
          />
        </div>
      )}
    </>
  );
};

export default Waiting;
