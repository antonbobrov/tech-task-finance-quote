import {
  InputNumber,
  Select, Space, Spin, Typography,
} from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import NumberFormat from '../../components/number/Format';
import { useAppSelector } from '../../store';
import useActions from '../../store/actions';

function RouteConverter() {
  const quotes = useAppSelector((state) => state.quotes);
  const actions = useActions();

  useEffect(() => {
    actions.fetchQuotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get unuqie quotes
  const quoteList = useMemo(() => Array.from(
    new Set(quotes.items.map((item) => item.from)),
  ), [quotes.items]);

  // selected currency
  const [selectedFrom, setSelectedFrom] = useState('');
  const [selectedTo, setSelectedTo] = useState('');

  // update on list change
  useEffect(() => {
    setSelectedFrom(quoteList[0] || '');
    setSelectedTo(quoteList[1] || '');
  }, [quoteList]);

  // sums
  const [sum, setSum] = useState(1);
  const [total, setTotal] = useState(0);

  // update total sum
  useEffect(() => {
    const quote = quotes.items.find((item) => (
      item.from === selectedFrom
      && item.to === selectedTo
    ));
    if (quote) {
      setTotal(quote.quote * sum);
    } else {
      setTotal(0);
    }
  }, [quotes.items, selectedFrom, selectedTo, sum]);

  return (
    <>
      <Typography.Title>Converter</Typography.Title>

      {quotes.items.length === 0 && (
        <Spin />
      )}

      {quoteList.length > 0 && (
        <Space
          size="large"
          wrap
        >

          <Space size="small">
            <Space direction="vertical">
              Sum
              <InputNumber
                style={{ width: '150px' }}
                size="large"
                min={1}
                defaultValue={sum}
                onChange={(val) => {
                  setSum(val);
                }}
              />
            </Space>
          </Space>

          <Space size="small">
            <Space direction="vertical">
              From
              <Select
                style={{ width: '150px' }}
                size="large"
                value={selectedFrom}
                onChange={(val) => setSelectedFrom(val)}
              >
                {quoteList.map((name) => {
                  const isInList = Array.from(new Set(
                    quotes.items.filter((item) => item.to === selectedTo).map((item) => item.from),
                  )).includes(name);
                  return (
                    <Select.Option
                      key={name}
                      disabled={name === selectedTo || !isInList}
                    >
                      {name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Space>
          </Space>

          <Space size="small">
            <Space direction="vertical">
              To
              <Select
                size="large"
                value={selectedTo}
                style={{ width: '150px' }}
                onChange={(val) => setSelectedTo(val)}
              >
                {quoteList.map((name) => {
                  const isInList = Array.from(new Set(
                    quotes.items.filter((item) => item.from === selectedFrom)
                      .map((item) => item.to),
                  )).includes(name);
                  return (
                    <Select.Option
                      key={name}
                      disabled={name === selectedFrom || !isInList}
                    >
                      {name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Space>
          </Space>

          <Typography.Title level={3}>
            Total sum:
            {' '}
            <b><NumberFormat value={total} /></b>
            {' '}
            {selectedTo}
          </Typography.Title>

        </Space>
      )}
    </>
  );
}
export default RouteConverter;
