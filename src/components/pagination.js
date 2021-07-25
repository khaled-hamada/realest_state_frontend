import React from 'react';
import { PropTypes } from 'prop-types';

const Pagination = (props) => {
   // this function return # of pages as a line , 
   // with each number having a onclick function 
   // so clicking it will send you to the clicked page number 
   const getNumbers =() =>{
      let numbers = [];
      let pageNumber = 1
      for(let i =0 ; i < props.count ; i += props.itemsPerPage){
         const page = pageNumber;
           let style = 'pagination__number';
           let content = null;
           if(props.active === page){ // current active page number
                  style = 'pagination__number pagination__number--active';
                  content = (
                     <div key={pageNumber} className={style}>
                        {pageNumber}

                     </div>
                  );
           }
           else{
              content =(
                 <div key={pageNumber} onClick={() => props.visitPage(page)} className={style}>
                     {pageNumber}
                 </div>
              );
           }

           numbers.push(content);
           pageNumber++;

      }
      return numbers;
   }
    return ( 
       <div className='pagination'>
            <div onClick={() => props.previous()} className='pagination__number'>
                Previous
            </div>
            {getNumbers()}
            <div onClick={() => props.next()} className='pagination__number'>
                Next
            </div>
        </div>
     );
}
Pagination.propTypes = {
    itemsPerPage: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired,
    visitPage: PropTypes.func.isRequired,
    previous: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
};
 
export default Pagination;