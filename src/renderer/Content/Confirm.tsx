import * as React from 'react';
import { Card, Radio, RadioChangeEvent } from 'antd';
import { AndroidFilled } from '@ant-design/icons';
import { styled } from '@stitches/react';
import { useRecoilState } from 'recoil';
import { appState } from '../constants/atoms';
import { OPERATION, REMOVE_MODE } from '../constants/types';

const Title = styled('h2', {
  margin: '4px 10px',
  color: '#f44336',
  opacity: 0.87,
  display: 'inline',
});

const Confirm = () => {
  const [state, setState] = useRecoilState(appState);

  const onChangeRemoveMode = ({ target: { value } }: RadioChangeEvent) => {
    setState({ ...state, removeMode: value });
  };

  return (
    <>
      <div
        style={{
          overflow: 'auto',
          height: '64px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Title>
          Selected packages will be {state.operation === OPERATION.DELETE ? 'removed' : 'installed'}
          !
        </Title>
        {state.operation === OPERATION.DELETE && (
          <div style={{ margin: '8px' }}>
            Mode :{' '}
            <Radio.Group value={state.removeMode} onChange={onChangeRemoveMode}>
              <Radio.Button value={REMOVE_MODE.DISABLE}>Disable</Radio.Button>
              <Radio.Button value={REMOVE_MODE.UNINSTALL}>Uninstall</Radio.Button>
            </Radio.Group>
          </div>
        )}
      </div>
      <div style={{ overflow: 'auto', height: 'calc(100% - 64px)', width: '100%' }}>
        {state.selected.map((item, index) => (
          <Card key={index} style={{ margin: 8 }}>
            <div style={{ display: 'table-cell' }}>
              <AndroidFilled style={{ fontSize: '1.8em', color: '#3DDC84' }} />
              <span style={{ padding: '0px 8px', verticalAlign: 'super' }}>{item}</span>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Confirm;
