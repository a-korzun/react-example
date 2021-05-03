import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';

import Head from './Head';

import './style.css';

interface Props {
  list: Record<string, string | boolean>[];
  keys: string[];
  order: string;
  onSort: (key: string) => void;
  sort?: string;
  query?: string;
}

export default function List({ list, keys, sort, order, onSort, query }: Props): JSX.Element {
  let sorted = [...list];

  useMemo(() => {
    if (query) {
      sorted = sorted.filter(obj => Object.values(obj).some(el => typeof el === 'string' && el.includes(query)));
    }
  }, [list, query, sort, order]);

  useMemo(() => {
    if (sort) {
      sorted.sort((a, b) => {
        if (a[sort] < b[sort]) {
          return order === 'asc' ? -1 : 1;
        }

        if (a[sort] > b[sort]) {
          return order === 'asc' ? 1 : -1;
        }

        return 0;
      });
    }
  }, [list, sort, order, query]);

  const rows = sorted.map((item) => (
    <tr key={nanoid()}>
      {
        keys.map((k) => (<td key={k}>{String(item[k])}</td>))
      }
    </tr>
  ));

  return (
    <table className="table">
      <thead className="table__header">
        <tr>
          {
            keys.map((k) => (
              <Head key={k} onClick={onSort} name={k} sort={sort} order={order} />
            ))
          }
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

