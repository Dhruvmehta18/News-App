import React, { Component } from "react";
import {Paper,InputBase,IconButton,Box,Tooltip, makeStyles } from '../../material-ui/core';
import {SearchIcon} from '../../material-ui/icon'
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4, 4),
  },
  iconButton: {
    flex:1
  },
  
  input: {
    textOverflow:'ellipsis',
    flex:1,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
}));
const style={
  maxWidth:600,
  // minWidth:100,
  margin:'auto'
}
const width={
  width:'100%'
}
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
      style={style}>
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
        style={width}
        inputProps={{ 'aria-label': 'Search',}}
      />
      </Box>
      </Box>
    </Paper>
    );
  }
}
export default Search;
