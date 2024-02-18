import React from "react";
import { Layout, Typography } from "antd";

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

export default function Footer() {
  return (
    <AntFooter style={{ textAlign: "center" }}>
      <Text>KNP Design 2024 Created by AntD</Text>
    </AntFooter>
  );
}