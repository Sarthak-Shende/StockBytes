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
        <Typography component='h1' textAlign='center' fontWeight='regular' color="#800000" className="main-heading" >
            Company: {company}
        </Typography>
        <Typography component='h2' color="#800000" className="sub-heading" >
            Chart:
        </Typography>
        <br />
        <Graph/>
        <Typography component='h2' color="#800000" className="sub-heading" >
            Profile and Financials:
        </Typography>
        <br />
        <Overview chooseCompany={chooseCompany} />
        <Typography component='h2' color="#800000" className="sub-heading" >
            News:
        </Typography>
        <br />
        <StockNews/>
        </>
    )
}

export default Stock;