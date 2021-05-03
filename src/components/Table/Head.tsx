import React from 'react';

interface Props {
  onClick: (key: string) => void;
  name: string;
  order: string;
  sort?: string;
}

export default function Head({ onClick, name, sort, order }: Props): JSX.Element {
  return (
    <th onClick={() => onClick(name)} role="button">
      { name }
      { sort === name && order === 'asc' ? '↓' : null }
      { sort === name && order === 'desc' ? '↑' : null }
    </th>
  );
}