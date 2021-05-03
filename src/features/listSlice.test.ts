import reducer, { setSorting, setQuery, fetchList, State } from './listSlice';

describe('listSlice reducers', () => {
  const initialState: State = {
    loadingState: 'idle',
    data: [],
    count: 0,
    order: 'desc',
    sort: '',
    query: '',
  };

  test('it should return dafault state', () => {
    // @ts-expect-error no typecheck action
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('it set sort properly', () => {
    const state = {
      ...initialState,
    };

    expect(reducer(state,
      {
        type: setSorting.toString(),
        payload: 'foo',
      })
    ).toEqual({
      ...initialState,
      sort: 'foo',
      order: 'desc',
    });

    expect(reducer({
        ...initialState,
        sort: 'foo',
        order: 'desc',
      },
      {
        type: setSorting.toString(),
        payload: 'foo',
      })
    ).toEqual({
      ...initialState,
      sort: 'foo',
      order: 'asc',
    });

    expect(reducer({
        ...initialState,
        sort: 'foo',
        order: 'asc'
      },
      {
        type: setSorting.toString(),
        payload: 'foo',
      })
    ).toEqual({
      ...initialState,
      sort: '',
      order: 'desc',
    });

    expect(reducer({
        ...initialState,
        sort: 'foo',
        order: 'desc'
      },
      {
        type: setSorting.toString(),
        payload: 'bar',
      })
    ).toEqual({
      ...initialState,
      sort: 'bar',
      order: 'desc',
    });
  });

  it('set query', () => {
    expect(reducer(
      { ...initialState },
      {
        type: setQuery.toString(),
        payload: 'foo',
      })
    ).toEqual({
      ...initialState,
      query: 'foo',
    });
  });

  it('set loading state to pending', () => {
    expect(
      reducer(
        { ...initialState },
        {
          type: fetchList.pending.toString(),
          payload: {},
        },
      ),
    ).toHaveProperty('loadingState', 'pending');
  });

  it('set loading state to fulfilled and set payload data', () => {
    expect(
      reducer(
        { ...initialState },
        {
          type: fetchList.fulfilled.toString(),
          payload: {
            entries: [{ name: 'foo'}, { name: 'bar'}],
            count: 2,
          },
        },
      ),
    ).toEqual({
      ...initialState,
      loadingState: 'fulfilled',
      count: 2,
      data: [{ name: 'foo'}, { name: 'bar'}],
    });
  });

  it('set loading state to rejected', () => {
    expect(
      reducer(
        { ...initialState },
        {
          type: fetchList.rejected.toString(),
          payload: {},
        },
      ),
    ).toHaveProperty('loadingState', 'rejected');
  });
});
