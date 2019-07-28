import React, { Component } from "react";
import Button from '@material-ui/core/Button';
class CustomButton extends Component {
  render() {
    const {
      onClick,
      color='primary',
      children,
      className='',
    } = this.props;

    return (
      <Button variant="contained" className={className} color={color} onClick={onClick} type="button">
        {children}
      </Button>
    );
  }
}
export default CustomButton;
