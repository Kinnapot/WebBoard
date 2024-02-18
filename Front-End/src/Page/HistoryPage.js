import React, { useState, useEffect } from "react";
import { Row, Col, List, Typography } from "antd";
import axios from "../Config/axios";
import Navbar from "../Component/navbar";
import Footer from "../Component/footer";

const { Text } = Typography;

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("/board/history");
    setHistory(res.data);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Row style={{padding:"50px", width:"100%"}}>
          <List
            style={{ width: "80%", margin: "0 auto" }}
            header={<div>HISTORY BOARD</div>}
            bordered
            dataSource={history}
            renderItem={(item) => (
              <Row justify="start" style={{ width: "100%", }}>
                    <Col span={3}>
                      <Text strong>ID:</Text> {item.id}
                    </Col>
                    <Col span={5}>
                      <Text strong>Time:</Text> {item.editTime}
                    </Col>
                    <Col span={10}>
                      <Text strong>Note:</Text> {item.note}
                    </Col>
                    <Col span={6}>
                      <Text strong>Category:</Text> {item.catagory}
                    </Col>
              </Row>
            )}
          />
        </Row>
      </div>
      <Footer />
    </div>
  );
}
