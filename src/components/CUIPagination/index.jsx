import React, { useState } from 'react';
import { Pagination } from '@mui/material';

const CUIPagination = ({ totalPage, handleChange, page }) => {

  return <Pagination onChange={handleChange} count={totalPage} page={page} />;

}

export default CUIPagination;