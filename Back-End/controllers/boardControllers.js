const { uniqueId } = require("lodash");
let data = [];
let history = [];

//GetData
const getBoardList = (req, res) => {
  let filteredData = data;
  const { filUser, filNote, filCatagory } = req.query;

  if (filUser) {
    filteredData = filteredData.filter((item) => item.user.includes(filUser));
  }

  if (filNote) {
    filteredData = filteredData.filter((item) => item.note.includes(filNote));
  }

  if (filCatagory) {
    filteredData = filteredData.filter((item) => item.catagory.includes(filCatagory));
  }

  res.status(200).send(filteredData);
};

//GetHistory
const getHistoryList = (req, res) => {
  res.status(200).send(history);
};

//GetProfile
const getProfile = (req, res) => {
  res.status(200).send(req.user);
};

//CreateDate
const createBoardList = (req, res) => {
  const newdata = {
    id: uniqueId(),
    user: req.user.name,
    time: new Date().toLocaleTimeString(),
    note: req.body.note,
    catagory: req.body.catagory,
  };
  data.push(newdata);
  res.status(201).send(newdata);
};

//UpdateData
const updateBoardList = (req, res) => {
  const targetId = String(req.params.id);
  const targetIdx = data.findIndex((data) => data.id === targetId);
  const owner = data[targetIdx].user === req.user.name;
  if (owner) {
    //Save ประวัติการแก้ไข
    const historyValue = {
      ...data[targetIdx],
      editTime: new Date().toLocaleTimeString(),
      status: "Edit",
    };
    history.push(historyValue);

    data[targetIdx] = {
      id: targetId,
      user: req.user.name,
      time: new Date().toLocaleTimeString(),
      note: req.body.note,
      catagory: req.body.catagory,
    };
    res.status(200).send({ message: "Updating is success" });
  } else {
    res.status(403).send({ message: "You are not the owner of this board" });
  }
};

//DeleteData
const deleteBoardList = (req, res) => {
  const targetId = String(req.params.id);
  const targetIdx = data.findIndex((data) => data.id === targetId);
  if (targetIdx === -1) {
    return res.status(404).send({ message: "Data mot found" });
  }
  const owner = data[targetIdx].user === req.user.name;
  if (owner) {
    //บันทึกประวัติการลบ
    const historyValue = {
      ...data[targetIdx],
      editTime: new Date().toLocaleTimeString(),
      status: "Delete",
    };
    history.push(historyValue);
    //
    data = data.filter((data) => data.id !== targetId);
    return res.status(204).send();
  } else {
    return res.status(403).send({ message: "data not found" });
  }
};

module.exports = {
  getBoardList,
  getHistoryList,
  getProfile,
  createBoardList,
  updateBoardList,
  deleteBoardList,
};
