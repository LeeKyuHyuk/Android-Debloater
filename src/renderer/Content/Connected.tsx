import * as React from 'react';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import GetPackages, { PackageData } from '../../adb/GetPackages';

type Filter = {
  value: string | null;
  matchMode: FilterMatchMode;
};

type TableFilter = {
  global: Filter;
};

type ConnectedProps = {
  rowSelected: PackageData[];
  setRowSelected: React.Dispatch<React.SetStateAction<PackageData[]>>;
};

const Connected = ({ rowSelected, setRowSelected }: ConnectedProps) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [dataSource, setDataSource] = React.useState<PackageData[]>([]);
  const [filterValue, setFilterValue] = React.useState<string>('');
  const [filter, setFilter] = React.useState<TableFilter>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const getData = async () => {
    setLoading(true);
    const packageData = await GetPackages();
    if (packageData[0].key === '-1') {
      return;
    }
    setDataSource(packageData);
    setLoading(false);
  };

  const renderHeader = () => {
    return (
      <span className="p-input-icon-left" style={{ width: '100%' }}>
        <i className="pi pi-search" />
        <InputText
          style={{ width: '100%' }}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Search..."
        />
      </span>
    );
  };

  React.useEffect(() => {
    if (dataSource.length === 0) getData();
  }, []);

  React.useEffect(() => {
    setFilter({
      global: { value: filterValue, matchMode: FilterMatchMode.CONTAINS },
    });
  }, [filterValue]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataTable
        dataKey="key"
        emptyMessage="No applications found."
        filters={filter}
        globalFilterFields={['name', 'apk']}
        header={renderHeader}
        loading={loading}
        onSelectionChange={(e) => setRowSelected(e.value)}
        responsiveLayout="scroll"
        scrollable
        scrollHeight="flex"
        selection={rowSelected}
        showGridlines
        value={dataSource}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: '64px' }}
          style={{ display: 'table-cell', flex: 0, width: '64px', wordBreak: 'break-word' }}
        />
        <Column
          field="name"
          header="Package Name"
          headerStyle={{ display: 'table-cell', width: 'calc(50% - 32px)' }}
          style={{ display: 'table-cell', width: 'calc(50% - 32px)', wordBreak: 'break-word' }}
        />
        <Column
          field="apk"
          header="Location"
          headerStyle={{ display: 'table-cell', width: 'calc(50% - 32px)' }}
          style={{ display: 'table-cell', width: 'calc(50% - 32px)', wordBreak: 'break-word' }}
        />
      </DataTable>
    </div>
  );
};

export default Connected;
