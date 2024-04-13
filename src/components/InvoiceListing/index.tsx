import React, { useEffect, useState } from 'react';
import InvoiceData from '../../data';
import { PAGINATION_LENGTH } from '../../constants';
import './invoicesListing.css';

const InvoiceItem = ({ invoiceItem }) => {
  return <div className="invoice-item">{invoiceItem.id}</div>
}

const InvoiceListing = () => {
  const [data, setData] = useState(InvoiceData);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if(!data.length) {
      setData(InvoiceData);
    }
  }, []);

  const setPageHandler = (selectedPage) => {
    if (page >= 1 && page < data.length / PAGINATION_LENGTH && page !== selectedPage) {
      setPage(selectedPage);
    }
  }

  return (
    <div>
      {data.length ? <div className="invoices">{data.slice(page*PAGINATION_LENGTH - PAGINATION_LENGTH, page * PAGINATION_LENGTH).map(invoice => <InvoiceItem invoiceItem={invoice} />)}</div>: null}
      {data.length > 0 ? 
      (<div className="pagination">
        <span className="pagination-btn" onClick={() => setPageHandler(page - 1)}>Prev</span>
        {[...Array((data?.length || 0) / PAGINATION_LENGTH)].map((_, index) => <span className="pagination-btn" key={index + 1} onClick={() => setPageHandler(index + 1)}>{index + 1}</span>)}
        <span className="pagination-btn" onClick={() => () => setPageHandler(page + 1)}>Next</span>
      </div>) : null}
    </div>
  );
}

export default InvoiceListing;