import React from 'react';
import renderer from 'react-test-renderer';

import Head from './Head';

describe('Table/Head', () => {
  test('Doesnt render sort if not provided', () => {
    const component = renderer.create(
      <Head name="foo" onClick={() => undefined} order="desc" />
    );

    const tree = component.toJSON();
    expect(tree).toHaveProperty('children', ['foo']);
  });

  test('Render desc sort order properly', () => {
    const component = renderer.create(
      <Head name="foo" onClick={() => undefined} order="desc" sort="foo" />
    );

    const tree = component.toJSON();
    expect(tree).toHaveProperty('children', ['foo', '↑']);
  });

  test('Render asc sort order properly', () => {
    const component = renderer.create(
      <Head name="foo" onClick={() => undefined} order="asc" sort="foo" />
    );

    const tree = component.toJSON();
    expect(tree).toHaveProperty('children', ['foo', '↓']);
  });
});