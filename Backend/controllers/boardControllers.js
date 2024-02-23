const { uniqueId } = require("lodash");
const { dataBoard } = require("../model/dataBoard");
const { dataHistory } = require("../model/dataHistory");

//GetData
const getBoardList = (req, res) => {
  let filteredBoard = dataBoard;
  const { filUser, filNote, filCategory } = req.query;

  if (filUser) {
    filteredBoard = filteredBoard.filter((item) => item.user && item.user.includes(filUser));
  }

  if (filNote) {
    filteredBoard = filteredBoard.filter((item) => item.note && item.note.includes(filNote));
  }

  if (filCategory) {
    filteredBoard = filteredBoard.filter((item) =>
    item.category &&item.category.includes(filCategory)
    );
  }

  res.status(200).send(filteredBoard);
};

//GetHistory
const getHistoryList = (req, res) => {
  res.status(200).send(dataHistory);
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
    category: req.body.category,
  };
  dataBoard.push(newdata);
  res.status(201).send(newdata);
};

//UpdateData
const updateBoardList = (req, res) => {
  const targetId = String(req.params.id);
  const targetIdx = dataBoard.findIndex((user) => user.id === targetId);
  //Check เป็นเจ้าของ หรือไหม
  const targetOwner = dataBoard[targetIdx].user === req.user.name;

  if (targetOwner) {
    const historyValue = {
      ...dataBoard[targetIdx],
      editTime: new Date().toLocaleTimeString(),
      status: "Edit",
    };

    dataHistory.push(historyValue);

    const updateData = (dataBoard[targetIdx] = {
      id: targetId,
      time: new Date().toLocaleTimeString(),
      note: req.body.note,
      category: req.body.category,
    });
    dataBoard[targetIdx] = updateData;
    res.status(200).send({ message: "Updating is success" });
  } else {
    res.status(403).send({ message: "You are not the owner of this board" });
  }
};

//DeleteData
const deleteBoardList = (req, res) => {
  const targetId = String(req.params.id);
  const targetIdx = dataBoard.findIndex((data) => data.id === targetId);

  const targetOwner = dataBoard[targetIdx].user === req.user.name;
  if (targetOwner) {
    const historyValue = {
      ...dataBoard[targetIdx],
      editTime: new Date().toLocaleTimeString(),
      status: "Delete",
    };
    dataHistory.push(historyValue);

    dataBoard.splice(targetIdx, 1);
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
