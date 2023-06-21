import Graph from './Graph';
import Overview from './Overview';
import StockNews from './StockNews';
import { useState } from 'react';
import { Typography } from '@mui/material';

const Stock = () => {
    const [company,setCompany] = useState(null);
    const chooseCompany = (company) => {
        setCompany(company);
    }

    return (
        <>
        <Typography variant='h1' >{company}</Typography>
        <Typography variant='h2' >
            Chart
        </Typography>
        <Graph/>
        <Typography variant='h2' >
            Profile and Financials
        </Typography>
        <Overview chooseCompany={chooseCompany} />
        <Typography variant='h2' >
            News
        </Typography>
        <StockNews/>
        </>
    )
}

export default Stock;