import React, { useState } from "react";
import { Row, Col, Button, Input, Typography, Space } from "antd";
import axios from "../Config/axios";

const { Text } = Typography;

function Content(props) {
  //ตัวแปร
  const [changeNote, setChangeNote] = useState("");
  const [changeCategory, setChangeCategory] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  //Update
  const updateData = async (id) => {
    await axios.put(`/board/${id}`, {
      note: changeNote,
      category: changeCategory,
    });
    props.fetchData();
    setIsEdit(false);
    setChangeNote("");
    setChangeCategory("");
  };

  const toggleEdit = () => {
    setChangeNote(props.todo.note);
    setChangeCategory(props.todo.category);
    setIsEdit(true);
  };

  let contents = (
    <Row style={{ width: "100%" }}>
      <Col span={10}>
        <Input
          value={changeNote}
          onChange={(e) => setChangeNote(e.target.value)}
        />
      </Col>
      <Col span={10}>
        <Input
          value={changeCategory}
          onChange={(e) => setChangeCategory(e.target.value)}
        />
      </Col>
      <Col span={4}>
        <Button type="primary" onClick={() => updateData(props.todo.id)}>
          Done
        </Button>
      </Col>
    </Row>
  );

  if (!isEdit) {
    contents = (
      <Row style={{ width: "100%" }}>
        <Col span={18}>
          <Row justify="start">
          <Space>
              <Text strong>ID:</Text> {props.todo.id}
              <Text strong>Time:</Text> {props.todo.time}
              <Text strong>Note:</Text> {props.todo.note}
              <Text strong>Category:</Text> {props.todo.category}
            </Space>
          </Row>
        </Col>
        <Col span={3}>
          <Button
            style={{ backgroundColor: "orange" }}
            type="primary"
            onClick={() => toggleEdit()}
          >
            Edit
          </Button>
        </Col>
        <Col span={3}>
          <Button
            type="primary"
            danger
            onClick={() => props.delete(props.todo.id)}
          >
            Delete
          </Button>
        </Col>
      </Row>
    );
  }

  return <div style={{ width: "100%" }}>{contents}</div>;
}

export default Content;
