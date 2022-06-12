import React from 'react'
import millify from "millify";
import {Typography,Row,Col,Statistic} from "antd";
import {Link} from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import {Cryptocurrencies, News} from "../components";
import Loader from "../components/Loader"
const {Title}=Typography;

const Homepage = () => {
    const {data, isFetching}=useGetCryptosQuery(10);
    const globalStats=data?.data?.stats;
    if(isFetching) return <Loader />
    return (
       
   <>
   <Title level={2} className="heading">Global Crypto States</Title>
   <Row>
       <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total}></Statistic></Col>
       <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}></Statistic></Col>
       <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)}></Statistic></Col>
       <Col span={12}><Statistic title="Total Marketcap" value={millify(globalStats.totalMarketCap)}></Statistic></Col>
       <Col span={12}><Statistic title="Total Market" value={millify(globalStats.totalMarkets)}></Statistic></Col>
   </Row>
   <div className="home-heading-container">
       <Title level={2} className="home-title">Top 10 Cryptocurrencies in the world</Title>
       <Title level={3} className="show-more"><Link to="/Cryptocurrencies">Show More</Link></Title>
   </div>
   <Cryptocurrencies simplified={true}/>
   <div className="home-heading-container">
       <Title level={2} className="home-title">Top Crypto News</Title>
       <Title level={3} className="show-more"><Link to="/News">Show More</Link></Title>
   </div>
   <News simplified />
   </>
    )
}

export default Homepage
