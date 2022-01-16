import * as React from 'react';
import styled from '@emotion/styled';
import { Card } from 'primereact/card';
import { PackageData } from '../../adb/GetPackages';

const Title = styled.h2({
  margin: '4px 10px',
  color: '#f44336',
  opacity: 0.87,
  display: 'inline',
});

type ConfirmProps = {
  rowSelected: PackageData[];
};

const Confirm = ({ rowSelected }: ConfirmProps) => {
  return (
    <>
      <div
        style={{
          overflow: 'auto',
          height: '64px',
          width: '100%',
          display: 'table-cell',
          verticalAlign: 'middle',
        }}
      >
        <Title>Selected packages will be uninstalled!</Title>
      </div>
      <div style={{ overflow: 'auto', height: 'calc(100% - 64px)', width: '100%' }}>
        {rowSelected.map((item, index) => (
          <Card key={index} style={{ margin: 8 }}>
            <i
              className="pi pi-android"
              style={{ color: '#78c257', fontSize: '1.1em', marginRight: '8px' }}
            ></i>
            <span style={{ fontSize: '1.1em' }}>{item.name}</span>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Confirm;
