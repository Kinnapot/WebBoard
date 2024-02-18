import React, { useEffect, useState } from "react";
import { Button, Layout, Menu, Typography } from "antd";
import { Link } from "react-router-dom";
import localStorageService from "../service/localStorageService";
import axios from "../Config/axios";

const { Header } = Layout;
const { Text } = Typography;

function Navbar(props) {
  const [profile, setProfile] = useState("");

  const logout = () => {
    localStorageService.removeToken();
    props.setRole("guest");
  };

  const fetchData = async () => {
    const httpRespones = await axios.get("/board/profile");
    setProfile(httpRespones.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Header>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/Home">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/History">History</Link>
            </Menu.Item>
          </Menu>
        </div>
        <div style={{ display: "flex", alignItems: "center"}}>
          {profile && <Text style={{backgroundColor:"white"}}>{profile.name}</Text>}
          <Button onClick={logout} style={{ marginLeft: "10px" }}>
            Logout
          </Button>
        </div>
      </div>
    </Header>
  );
}

export default Navbar;
