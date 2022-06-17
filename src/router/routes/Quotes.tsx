import {
  Switch, Table, TableColumnsType, Typography,
} from 'antd';
import React, { useEffect } from 'react';
import NumberFormat from '../../components/number/Format';
import { useAppSelector } from '../../store';
import useActions from '../../store/actions';
import { QuotesItem } from '../../store/quotes/types';

type QuoteType = {
  name: string;
} & QuotesItem;

function RouteQuotes() {
  const quotes = useAppSelector((state) => state.quotes);
  const actions = useActions();

  useEffect(() => {
    actions.fetchQuotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items: QuoteType[] = quotes.items.map((item) => {
    const isStarred = !!quotes.starred.find((starredItem) => {
      if (starredItem.key === item.key) {
        return true;
      }
      return false;
    });
    return {
      ...item,
      isStarred,
      name: `${item.from}/${item.to}`,
    };
  });

  const columns: TableColumnsType<QuoteType> = [
    {
      dataIndex: 'isStarred',
      title: 'Favourite',
      render: (val, row) => (
        <Switch
          defaultChecked={val}
          onChange={(switchVal) => {
            if (switchVal) {
              actions.starQuote({
                key: row.key,
              });
            } else {
              actions.unStarQuote({
                key: row.key,
              });
            }
          }}
        />
      ),
      sorter: (row: any) => (row.isStarred ? -1 : 1),
    },
    {
      dataIndex: 'name',
      title: 'Name',
      sorter: (a, b) => (b.name > a.name ? -1 : 1),
    },
    {
      dataIndex: 'quote',
      title: 'Quote',
      render: (val) => (<NumberFormat value={val} />),
    },
  ];

  return (
    <>
      <Typography.Title>Available List</Typography.Title>
      <Table columns={columns} dataSource={items} pagination={false} />
    </>
  );
}
export default RouteQuotes;
