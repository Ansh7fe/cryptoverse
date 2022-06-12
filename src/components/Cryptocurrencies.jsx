import React from 'react';
import { Link } from "react-router-dom";
import {Card ,Row, Col, Input} from "antd";
import millify from "millify";
import {useGetCryptosQuery} from "../services/cryptoApi";
import { useState ,useEffect } from "react";
import Loader from "../components/Loader"

const Cryptocurrencies = ({simplified}) => {
    const count=simplified?10:100
    const {data:cryptosLists,isFetching}=useGetCryptosQuery(count);
    const [cryptos, setcryptos] = useState([]);
    const [cryptoName, setCryptoName] = useState("");
    useEffect(() => {
       
        const filterdName=cryptosLists?.data.coins.filter((coin)=>coin.name.toLowerCase().includes(cryptoName.toLowerCase()));
        setcryptos(filterdName)
    }, [cryptosLists,cryptoName])
    if(isFetching) return <Loader />;
    return (
        <>
        {!simplified &&(
            <div className="crypto-searchbar">
            <Input className="crypto-searchbar"  placeholder="Search cryptocurrency" onChange={(e)=>setCryptoName(e.target.value)}></Input>
        </div>
        )}
       
        <Row gutter={[32,32]} className="crypto-card-container">
            {cryptos?.map((currency)=>(
                <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
                    <Link to={`/crypto/${currency.uuid}`}>
                        <Card title={`${currency.rank}.${currency.name}`}
                         extra={<img className="crypto-image" src={currency.iconUrl}
                         hoverable="true">
                         </img>}>
                             <p>Price:{millify(currency.price)}$</p>
                             <p>Market Cap:{millify(currency.marketCap)}</p>
                             <p>Daily Changes:{millify(currency.change)}%</p>
                         </Card>
                    </Link>
                </Col>
            ))}
        </Row>
        </>
    )
}

export default Cryptocurrencies