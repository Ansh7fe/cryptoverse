import React,{useState} from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi"
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader"
const { Title, Text } = Typography;
const { Option } = Select;
const demoImage = "../images/cryptocurrency.png";


const News = ({ simplified }) => {
    const [newsCategory, setnewsCategory] = useState("Cryptocurrency");
    const {data}=useGetCryptosQuery(100);
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory , count: simplified ? 6 : 12 });
    console.log(cryptoNews);
    if (!cryptoNews?.value) return  <Loader />;

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                <Select
                showSearch
                className="news-select"
                placeholder="Search for crypto"
                optionFilterProp="children"
                onChange={value=>setnewsCategory(value)}
                filterOption={(input,option)=>option.children.toLowerCase().indexOf(input.toLowerCase())>= 0} 
                  >
                <Option value="Cryptocurrency"></Option>
                {data?.data?.coins.map((currency)=> <Option value={currency.name}>{currency.name}</Option>)}
                
                </Select>

                </Col>
            )}
            {cryptoNews.value.map((news, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer"  >
                            <div className="news-image-container">
                                <Title level={4} className="news-title">
                                    {news.name}
                                </Title>
                                <img style={{ maxHeight: "100px", maxWidth: "200px" }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                            </div>
                            <p>
                                {news.description.length > 100 ? `${news.description.substring(0, 100)}` : news.description}
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News