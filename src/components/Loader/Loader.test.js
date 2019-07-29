import React from 'react';
import ReactDOM from 'react-dom';
import Loader from './Loader';
import renderer from 'react-test-renderer';

describe('Loader', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Loader/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Loader/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
