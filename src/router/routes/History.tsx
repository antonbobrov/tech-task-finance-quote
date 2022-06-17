import { Table, TableColumnsType, Typography } from 'antd';
import React, { useEffect } from 'react';
import NumberFormat from '../../components/number/Format';
import { useAppSelector } from '../../store';
import useActions from '../../store/actions';
import { HistoryItem } from '../../store/history/types';

function RouteHistory() {
  const history = useAppSelector((state) => state.history);
  const actions = useActions();

  useEffect(() => {
    actions.fetchHistroy();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: TableColumnsType<HistoryItem> = [
    {
      dataIndex: 'from',
      title: 'From',
      sorter: (a, b) => (a.from > b.from ? 1 : -1),
    },
    {
      dataIndex: 'to',
      title: 'To',
      sorter: (a, b) => (a.to > b.to ? 1 : -1),
    },
    {
      dataIndex: 'quote',
      title: 'Quote',
      sorter: (a, b) => (a.quote > b.quote ? 1 : -1),
      render: (val) => <NumberFormat value={val} />,
    },
    {
      dataIndex: 'date',
      title: 'Date',
      sorter: (a, b) => (a.date > b.date ? 1 : -1),
      render: (val) => (
        <>
          {new Intl.DateTimeFormat('en-us', {
            timeStyle: 'short',
            dateStyle: 'medium',
          }).format(val)}
        </>
      ),
    },
    {
      dataIndex: 'profit',
      title: 'Profit',
      sorter: (a, b) => (a.profit > b.profit ? 1 : -1),
    },
  ];

  return (
    <>
      <Typography.Title>History</Typography.Title>
      <Table
        columns={columns}
        dataSource={history.items}
      />
    </>
  );
}
export default RouteHistory;
