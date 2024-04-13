import React, { useEffect, useState } from 'react';
import { data as InvoicesData } from '../../data';
import { PAGINATION_LENGTH } from '../../constants';
import CUIPagination from '../CUIPagination';
import CUICollapsibleTable from '../CUICollapsibleTable'; 
import './invoicesListing.css';

const InvoiceItem = ({ invoiceItem }) => {
  return <div className="invoice-item">{invoiceItem.id}</div>
}

const InvoiceListing = () => {
  const [data, setData] = useState(InvoicesData);
  const [currPage, setPage] = useState(1);
  const numberOfPages = Math.ceil(data.length / PAGINATION_LENGTH);

  useEffect(() => {
    if(!data.length) {
      setData(InvoicesData);
    }
  }, []);

  const setPageHandler = (e, selectedPage) => {
    if(currPage === selectedPage) {
      return;
    }
    if (selectedPage >= 1 && selectedPage <= numberOfPages) {
      setPage(selectedPage);
    }
  }

  return (
    <div>
      {/* {data.length ? <div className="invoices">{data.slice(currPage*PAGINATION_LENGTH - PAGINATION_LENGTH, currPage * PAGINATION_LENGTH).map(invoice => <InvoiceItem invoiceItem={invoice} />)}</div>: null} */}
      <CUICollapsibleTable data={data} currPage={currPage}/>
      {data.length > 0 ? <CUIPagination totalPage={numberOfPages} page={currPage} handleChange={setPageHandler}/> : null}
    </div>
  );
}

export default InvoiceListing;