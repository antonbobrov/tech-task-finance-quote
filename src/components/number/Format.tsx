import React from 'react';
import ReactNumberFormat from 'react-number-format';

interface Props {
  value: number | string;
}

function NumberFormat({
  value,
}: Props) {
  return (
    <ReactNumberFormat
      value={value}
      displayType="text"
      decimalScale={4}
      fixedDecimalScale
    />
  );
}
export default NumberFormat;
