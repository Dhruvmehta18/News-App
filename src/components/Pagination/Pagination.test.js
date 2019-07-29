import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from './Pagination'
import renderer from 'react-test-renderer';

describe('Pagination', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Pagination/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  test('has a valid snapshot', () => {
      const pageNo = 1,nbPages=50;
    const component = renderer.create(
      <Pagination pageNo={pageNo} nbPages={nbPages} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
