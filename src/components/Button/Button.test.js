import React from 'react';
import ReactDOM from 'react-dom';
import CustomButton from './Button'
import renderer from 'react-test-renderer';

describe('Button', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CustomButton>CustomButton</CustomButton>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  test('has a valid snapshot', () => {
    const component = renderer.create(
      <CustomButton>CustomButton</CustomButton>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
