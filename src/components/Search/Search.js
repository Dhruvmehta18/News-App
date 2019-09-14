import React, { Component } from "react";
import {Paper,InputBase,IconButton,Box,Tooltip } from '../../material-ui/core';
import { display } from '@material-ui/system';
import {SearchIcon} from '../../material-ui/icon';
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
        <Box component="div">
        <Tooltip title="Search">
        <IconButton onClick={onSubmit} className={useStyles.iconButton} aria-label="Search">
        <SearchIcon />
      </IconButton>
        </Tooltip>
      </Box>
      <Box component="div" display='flex' textOverflow="ellipsis" m={1} width={1} inputTypeSearch>
      <InputBase
        placeholder={children}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        inputProps={{ 'aria-label': 'Search',}}
        style={{width:'100%'}}
      />
      </Box>
      </Box>
    </Paper>
    );
  }
}
export default Search;
