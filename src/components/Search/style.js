import {makeStyles} from '../../material-ui/core'
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
    style:{
      width:'100%',
    },
    width:{
        width:'100%',
    },
    searchInput:{
      textOverflow:'ellipsis',
      width:'100%',
      flex:1
    },
  }));

export default useStyles;