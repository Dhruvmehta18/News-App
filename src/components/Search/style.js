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
        maxWidth:600,
        // minWidth:100,
        margin:'auto'
    },
    width:{
        width:'100%'
    }
  }));

export default useStyles;