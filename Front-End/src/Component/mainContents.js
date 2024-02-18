import React, { useEffect, useState } from "react";
import { Button, Col, Divider, Input, List, Row, Typography } from "antd";
import Content from "./content";
import axios from "../Config/axios";

const { Text } = Typography;

function MainContents() {
  //กำหนดค่าตัวแปร CRUD
  const [todoList, setTodoList] = useState([]);
  const [InputNote, setInputNote] = useState("");
  const [InputCatagory, setInputCatagory] = useState("");

  //กำหนดตัวแปร Filter
  const [InputFilUser, setInputFilUser] = useState("");
  const [InputFilNote, setInputFilNote] = useState("");
  const [InputFilCatagory, setInputFilCatagory] = useState("");

  //GET Board
  const fetchData = async () => {
    const httptRespones = await axios.get("/board/", {
      params: {
        filUser: InputFilUser,
        filNote: InputFilNote,
        filCatagory: InputFilCatagory,
      },
    });
    setTodoList(httptRespones.data);
  };

  //ทำให้ข้อมูลแสดงเมือรีเฟรช browser
  useEffect(() => {
    fetchData();
  }, [InputFilUser, InputFilNote, InputFilCatagory]);

  //Create
  const addTodoItem = async () => {
    await axios.post("/board/", {
      note: InputNote,
      catagory: InputCatagory,
    });
    fetchData();
    setInputNote("");
    setInputCatagory("");
  };

  //Delete
  const deleteTodoItem = async (id) => {
    await axios.delete(`/board/${id}`);
    fetchData();
  };

  return (
    //Show
    <Row justify={"center"} style={{padding:"20px"}}>
      <Col>
        <Row justify={"center"}>
          <Text type="warning">FILTER BOARD</Text>
        </Row>
        <Row>
          <Col span={6}>
            <Text>User</Text>
          </Col>
          <Col span={16}>
            <Input
              value={InputFilUser}
              onChange={(e) => setInputFilUser(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Text>Note</Text>
          </Col>
          <Col span={16}>
            <Input
              value={InputFilNote}
              onChange={(e) => setInputFilNote(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Text>Catagory</Text>
          </Col>
          <Col span={16}>
            <Input
              value={InputFilCatagory}
              onChange={(e) => setInputFilCatagory(e.target.value)}
            />
          </Col>
        </Row>
        <Divider />
        <Row>
          <List
            style={{ width: "80vw" }}
            header={<div>BOARD</div>}
            bordered
            dataSource={todoList}
            renderItem={(todo) => (
              <List.Item>
                <Content
                  fetchData={fetchData}
                  delete={deleteTodoItem}
                  todo={todo}
                />
              </List.Item>
            )}
          />
        </Row>
        <Divider />
        <Row justify={"center"}>
          <Text type="warning">ADD THE BOARD</Text>
        </Row>
        <Row>
          <Col span={6}>
            <Text>Note</Text>
          </Col>
          <Col span={16}>
            <Input
              value={InputNote}
              onChange={(e) => setInputNote(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Text>Catagory</Text>
          </Col>
          <Col span={16}>
            <Input
              value={InputCatagory}
              onChange={(e) => setInputCatagory(e.target.value)}
            />
          </Col>
        </Row>
        <Row justify={"center"}>
          <Col span={4} style={{padding:"5px"}}>
            <Button style={{ width: "100%" }} onClick={addTodoItem}>
              ADD
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default MainContents;
