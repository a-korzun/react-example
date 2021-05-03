import React from 'react';
import renderer from 'react-test-renderer';

import Table from './';

describe('Table', () => {
  test('Render list', () => {
    const props = {
      list: [
        {
          name: 'foo 1',
          value: 'bar 1',
        },
        {
          name: 'foo 2',
          value: 'bar 2',
        },
      ],
      keys: ['name', 'value'],
      order: 'desc',
      onSort: () => undefined,
      sort: '',
      query: '',
    };
    const component = renderer.create(<Table {...props} />);

    const tree = component.toJSON();

    const snapshot = {
      type: 'table',
      props: { className: 'table', },
      children: [
        {
          type: 'thead',
          props: { className: 'table__header' },
          children: [
            {
              type: 'tr',
              props: {},
              children: [
                { type: 'th', props: { role: 'button' }, children: ['name'] },
                { type: 'th', props: { role: 'button' }, children: ['value'] },
              ],
            },
          ],
        },
        {
          type: 'tbody',
          props: {},
          children: [
            {
              type: 'tr',
              props: {},
              children: [
                { type: 'td', props: {}, children: ['foo 1'] },
                { type: 'td', props: {}, children: ['bar 1'] },
              ],
            },
            {
              type: 'tr',
              props: {},
              children: [
                { type: 'td', props: {}, children: ['foo 2'] },
                { type: 'td', props: {}, children: ['bar 2'] },
              ],
            },
          ],
        },
      ],
    };

    expect(JSON.stringify(tree)).toEqual(JSON.stringify(snapshot));
  });

  test('Render descending list according to sort rules', () => {
    const props = {
      list: [
        {
          name: 'foo 1',
          value: 'bar 1',
        },
        {
          name: 'foo 2',
          value: 'bar 2',
        },
        {
          name: 'foo 0',
          value: 'bar 0',
        }
      ],
      keys: ['name', 'value'],
      order: 'desc',
      onSort: () => undefined,
      sort: 'value',
      query: '',
    };
    const component = renderer.create(<Table {...props} />);

    const tree = component.toJSON();

    const snapshot = {
      type: 'table',
      props: { className: 'table', },
      children: [
        {
          type: 'thead',
          props: { className: 'table__header' },
          children: [
            {
              type: 'tr',
              props: {},
              children: [
                { type: 'th', props: { role: 'button' }, children: ['name'] },
                { type: 'th', props: { role: 'button' }, children: ['value', '↑'] },
              ],
            },
          ],
        },
        {
          type: 'tbody',
          props: {},
          children: [
            {
              type: 'tr',
              props: {},
              children: [
                { type: 'td', props: {}, children: ['foo 2'] },
                { type: 'td', props: {}, children: ['bar 2'] },
              ],
            },
            {
              type: 'tr',
              props: {},
              children: [
                { type: 'td', props: {}, children: ['foo 1'] },
                { type: 'td', props: {}, children: ['bar 1'] },
              ],
            },
            {
              type: 'tr',
              props: {},
              children: [
                { type: 'td', props: {}, children: ['foo 0'] },
                { type: 'td', props: {}, children: ['bar 0'] },
              ],
            },
          ],
        },
      ],
    };

    expect(JSON.stringify(tree)).toEqual(JSON.stringify(snapshot));
  });

  test('Render ascending list according to sort rules', () => {
    const props = {
      list: [
        {
          name: 'foo 1',
          value: 'bar 1',
        },
        {
          name: 'foo 2',
          value: 'bar 2',
        },
        {
          name: 'foo 0',
          value: 'bar 0',
        }
      ],
      keys: ['name', 'value'],
      order: 'asc',
      onSort: () => undefined,
      sort: 'name',
      query: '',
    };
    const component = renderer.create(<Table {...props} />);

    const tree = component.toJSON();

    const snapshot = {
      type: 'table',
      props: { className: 'table', },
      children: [
        {
          type: 'thead',
          props: { className: 'table__header' },
          children: [
            {
              type: 'tr',
              props: {},
              children: [
                { type: 'th', props: { role: 'button' }, children: ['name', '↓'] },
                { type: 'th', props: { role: 'button' }, children: ['value'] },
              ],
            },
          ],
        },
        {
          type: 'tbody',
          props: {},
          children: [
            {
              type: 'tr',
              props: {},
              children: [
                { type: 'td', props: {}, children: ['foo 0'] },
                { type: 'td', props: {}, children: ['bar 0'] },
              ],
            },
            {
              type: 'tr',
              props: {},
              children: [
                { type: 'td', props: {}, children: ['foo 1'] },
                { type: 'td', props: {}, children: ['bar 1'] },
              ],
            },
            {
              type: 'tr',
              props: {},
              children: [
                { type: 'td', props: {}, children: ['foo 2'] },
                { type: 'td', props: {}, children: ['bar 2'] },
              ],
            },
          ],
        },
      ],
    };

    expect(JSON.stringify(tree)).toEqual(JSON.stringify(snapshot));
  });


  test('Render filtered list', () => {
    const props = {
      list: [
        {
          name: 'foo 1',
          value: 'bar 1',
        },
        {
          name: 'foo 2 bazz',
          value: 'bar 2',
        },
        {
          name: 'foo 0',
          value: 'bar 0',
        }
      ],
      keys: ['name', 'value'],
      order: 'desc',
      onSort: () => undefined,
      sort: '',
      query: 'baz',
    };
    const component = renderer.create(<Table {...props} />);

    const tree = component.toJSON();

    const snapshot = {
      type: 'table',
      props: { className: 'table', },
      children: [
        {
          type: 'thead',
          props: { className: 'table__header' },
          children: [
            {
              type: 'tr',
              props: {},
              children: [
                { type: 'th', props: { role: 'button' }, children: ['name'] },
                { type: 'th', props: { role: 'button' }, children: ['value'] },
              ],
            },
          ],
        },
        {
          type: 'tbody',
          props: {},
          children: [
            {
              type: 'tr',
              props: {},
              children: [
                { type: 'td', props: {}, children: ['foo 2 bazz'] },
                { type: 'td', props: {}, children: ['bar 2'] },
              ],
            },
          ],
        },
      ],
    };

    expect(JSON.stringify(tree)).toEqual(JSON.stringify(snapshot));
  });
});
