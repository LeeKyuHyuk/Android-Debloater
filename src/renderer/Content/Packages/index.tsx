import * as React from 'react';
import { Card, List } from 'antd';
import { AndroidFilled } from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import ToolBar from './ToolBar';
import { appState } from '../../constants/atoms';
import { OPERATION } from '../../constants/types';
import { GetDisablePackages, GetEnablePackages } from '../../../adb/GetPackages';
import { DELETE, INSTALL, WHITE } from '../../constants/colors';

const Packages = () => {
  const [state, setState] = useRecoilState(appState);
  const [dataSource, setDataSource] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState<string>('');

  React.useEffect(() => {
    (async () => {
      const data = await GetEnablePackages();
      setDataSource(data);
    })();
  }, []);

  React.useEffect(() => {
    if (state.operation === OPERATION.DELETE) {
      (async () => {
        const data = await GetEnablePackages();
        setDataSource(data);
      })();
    } else {
      (async () => {
        const data = await GetDisablePackages();
        setDataSource(data);
      })();
    }
  }, [state.operation]);

  const onSearch = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  };

  const onSelect = (name: string) => {
    if (state.selected.includes(name)) {
      setState({ ...state, selected: state.selected.filter((value) => value !== name) });
    } else {
      const selected = [...state.selected];
      selected.push(name);
      setState({ ...state, selected });
    }
  };

  return (
    <>
      <ToolBar search={search} onSearch={onSearch} />
      <List
        grid={{ column: 1 }}
        dataSource={dataSource.filter((element) => {
          if (element.indexOf(search) !== -1) {
            return true;
          }
        })}
        renderItem={(item) => (
          <List.Item>
            <Card
              style={{
                margin: '4px 8px',
                background: state.selected.includes(item)
                  ? state.operation === OPERATION.DELETE
                    ? DELETE
                    : INSTALL
                  : WHITE,
              }}
              onClick={() => onSelect(item)}
            >
              <div style={{ display: 'table-cell' }}>
                <AndroidFilled style={{ fontSize: '1.8em', color: '#3DDC84' }} />
                <span style={{ padding: '0px 8px', verticalAlign: 'super' }}>{item}</span>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default Packages;
