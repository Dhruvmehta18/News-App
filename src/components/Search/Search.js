import React, { Component } from "react";
import {Paper,InputBase,IconButton,Box,Tooltip } from '../../material-ui/core';
import {SearchIcon} from '../../material-ui/icon'
import useStyles from './style';
class Search extends Component {
  render() {
    const { 
      value,
      onChange,
      onSubmit,
      onKeyDown,
      children
    } = this.props;
    return (
      <Paper
      style={useStyles.style}>
      <Box  width={1} display="flex" >
        <Box component="div"   width={0.1}>
        <Tooltip title="Search">
        <IconButton onClick={onSubmit} className={useStyles.iconButton} aria-label="Search">
        <SearchIcon />
      </IconButton>
        </Tooltip>
      </Box>
      <Box component="div" textOverflow="ellipsis" m={1} width="0.9">
      <InputBase
        className={useStyles.input}
        placeholder={children}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={useStyles.width}
        inputProps={{ 'aria-label': 'Search',}}
      />
      </Box>
      </Box>
    </Paper>
    );
  }
}
export default Search;
