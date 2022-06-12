import React from 'react'
import {Switch ,Route, Link} from "react-router-dom";
import { Routes} from 'react-router-dom';
import {Layout,Typography,Space} from "antd";
import { Navbar,Exchanges,CryptoDetails,Homepage,News,Cryptocurrencies } from "./components";
import "./App.css"


const App = () => {
    return (
        <div className="app">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="main">
                <Layout>
                    <div className="routes">
                        <Routes>
                            <Route  path="/" element={<Homepage />} />
                        </Routes>
                        <Routes>
                            <Route  path="/exchanges" element={<Exchanges />} />
                        </Routes>
                        <Routes>
                            <Route  path="/cryptocurrencies" element={<Cryptocurrencies/>} />

                        </Routes>
                        <Routes>
                            <Route  path="/crypto/:coinID" element={<CryptoDetails/>} />   {/* here : means dynamically */}

                        </Routes>
                        <Routes>
                            <Route  path="/news" element={<News/>} />
                        </Routes>
                    </div>
                </Layout>
                <div className="footer">
                    <Typography.Title level={5} style={{color:"white",textAlign:"center"}}>
                        Cryptoverse <br />
                        All rights reserved
                    </Typography.Title>
                    <Space>
                        <Link to="/">Home</Link>
                        <Link to="/exchanges">Exchanges</Link>
                        <Link to="/news">News</Link>
                    </Space>
            </div>
            </div>
            
        </div>
    )
}

export default App
