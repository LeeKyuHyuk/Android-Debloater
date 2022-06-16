import * as React from 'react';
import { useRecoilState } from 'recoil';
import { styled } from '@stitches/react';
import { Input, Radio, RadioChangeEvent } from 'antd';
import { OPERATION } from '../../constants/types';
import { appState } from '../../constants/atoms';

const ToolBarLayout = styled('div', {
  height: '56px',
  padding: '12px 18px',
  backgroundColor: '#ffffff',
  display: 'flex',
  justifyContent: 'space-between',
  zIndex: 1,
});

const FilterLayout = styled('div', {
  textAlign: 'right',
  verticalAlign: 'middle',
});

type ToolBarProps = {
  search: string;
  onSearch: ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => void;
};

const ToolBar = ({ search, onSearch }: ToolBarProps) => {
  const [state, setState] = useRecoilState(appState);

  const onChangeFilter = ({ target: { value } }: RadioChangeEvent) => {
    setState({ ...state, operation: value, selected: [] });
  };

  return (
    <ToolBarLayout>
      <Input
        style={{ width: '50%' }}
        placeholder="Search packages..."
        value={search}
        onChange={onSearch}
        allowClear
      />
      <FilterLayout>
        <Radio.Group
          options={[
            { label: 'Enabled', value: OPERATION.DELETE },
            { label: 'Disabled', value: OPERATION.INSTALL },
          ]}
          onChange={onChangeFilter}
          value={state.operation}
          optionType="button"
        />
      </FilterLayout>
    </ToolBarLayout>
  );
};

export default ToolBar;
