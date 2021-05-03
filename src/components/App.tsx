import React, { useEffect } from 'react';

import { fetchList, setSorting, setQuery } from '../features/listSlice';
import { useAppSelector, useAppDispatch } from '../hooks';
import Table from './Table';

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const loadingState = useAppSelector((state) => state.list.loadingState);
  const count = useAppSelector((state) => state.list.count);
  const list = useAppSelector((state) => state.list.data);
  const sort = useAppSelector((state) => state.list.sort);
  const order = useAppSelector((state) => state.list.order);
  const query = useAppSelector((state) => state.list.query);

  useEffect(() => {
    if (loadingState === 'idle') {
      dispatch(fetchList());
    }
  }, [loadingState, dispatch]);

  const keys = [
    'API',
    'Description',
    'Auth',
    'HTTPS',
    'Cors',
    'Link',
    'Category',
  ];

  let table;

  if (list.length) {
    table = (
      <Table
        list={list}
        keys={keys}
        sort={sort}
        order={order}
        onSort={(key) => dispatch(setSorting(key))}
        query={query}
      />
    );
  }

  return (
    <>
      <div className="app-header">
        <h1>API list</h1>
        <p>
          <label>
            Filter:&nbsp;
            <input value={query} onChange={(event) => dispatch(setQuery(event.target.value))} />
          </label>
        </p>
      </div>
      <div className="app-container">
        { table }
      </div>
    </>
  );
}
