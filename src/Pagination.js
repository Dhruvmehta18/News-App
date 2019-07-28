import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import "./Pagination.css"
class Pagination extends Component {
  render(){
    const {
      pageNo,
      nbPages,
      OnPaginationItemClickListener,
    }=this.props;
  let pageArray=[];
  const range=4;
  let temp=(pageNo-range);
  const min=temp>1?temp:2;
  temp=min+2*range;
  const max=temp<50?(nbPages<2*range?nbPages:temp):49;
  // console.log("min="+min+" max="+max);
  for (let index = min; index <= max; index++) {
    pageArray[index]=index;
  }
  return(
    <div className="interactions">
    <Box display="flex" p={1} m={1} justifyContent="center" >
      {pageNo===0&&
        <Box p={1} key={0} className="pagination active" onClick={() => OnPaginationItemClickListener(0)} >
        1
      </Box>}
      {pageNo!==0&&
      <Box p={1} key={0} className="pagination" onClick={() => OnPaginationItemClickListener(0)} >
        1
      </Box>}
      {min!==2&&
        <Box p={1}  key={-1} className="pagination">
      &lsaquo;&lsaquo;
      </Box>}
      
      {pageArray.map((item,index)=>{
        const className = pageNo === index-1 ? 'pagination active' : 'pagination';
        return(
        <Box p={1}  key={item-1} className={className} onClick={() => OnPaginationItemClickListener(item-1)}>
        {item}
        </Box>
        )
      })
      }
      {max!==49&&max!==min-1&&
        <Box p={1} key={nbPages} className="pagination" >
        &rsaquo;&rsaquo;
        </Box>}
      {max!==min-1&&pageNo!==nbPages-1&&
      <Box p={1}  key={nbPages-1} className="pagination" onClick={() => OnPaginationItemClickListener(nbPages-1)}>
        {nbPages}
      </Box>
    }
    {max!==min-1&&pageNo===nbPages-1&&
      <Box p={1}  key={nbPages-1} className="pagination active" onClick={() => OnPaginationItemClickListener(nbPages-1)}>
        {nbPages}
      </Box>
    }
    </Box>
    </div>
  );
}
}
export default Pagination;