import React from "react";

//phân trang

interface Pagination{
  currentPage : number;
  totalPage : number;
  Paginating : any;
}

export const Pagination: React.FC<Pagination> = (props) => {
  const PageList = [];

  if(props.currentPage === 1){
    //trang hien tai
    PageList.push(props.currentPage);
    //trang +1
    if(props.totalPage >=2){
      PageList.push(props.currentPage+1);
    }
    //trang +2
    if(props.totalPage >=3){
      PageList.push(props.currentPage+2);
    }
    if(props.totalPage>props.currentPage+1){
      PageList.push(props.totalPage)
    }
  }
  else if(props.currentPage>1 && props.currentPage < props.totalPage){
    if(props.currentPage>=4){
      PageList.push(1);
    }
    //trang -2
    if(props.currentPage>=3){
      PageList.push(props.currentPage-2);
    }
    //trang -1
    if(props.currentPage>=2){
      PageList.push(props.currentPage-1);
    }
    //trang hien tai
    PageList.push(props.currentPage);
    //trang +1
    if(props.totalPage>=props.currentPage+1){
      PageList.push(props.currentPage+1);
    }
    //trang +2
    if(props.totalPage>=props.currentPage+2){
      PageList.push(props.currentPage+2);
    }
    if(props.totalPage>=props.currentPage+3){
      PageList.push(props.totalPage);
    }
  }
  else{
    if(props.currentPage>=4){
      PageList.push(1);
    }
    if(props.currentPage>=3){
      PageList.push(props.currentPage-2);
    }
    if(props.currentPage>=2){
      PageList.push(props.currentPage-1);
    }
    PageList.push(props.currentPage);
  }

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className="page-item" onClick={()=>props.Paginating(props.currentPage-1)}>
            <button className="page-link" disabled={props.currentPage === 1}>
              Previous
          </button>
        </li> 
          {
            PageList.map((page)=>(
              <li  className={`page-item ${props.currentPage === page ? 'active' : ''}`} key={page} onClick={()=>props.Paginating(page)}>
                  <button className="page-link" >
                    {page}
                  </button>
            </li>
            )
            )
          }
        <li className="page-item" onClick={()=>props.Paginating(props.currentPage+1)}>
            <button className="page-link" disabled={props.currentPage === props.totalPage} >
              Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
