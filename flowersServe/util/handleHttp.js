module.exports = (res, successData={sqlMessage:'服务超时'}, successCode, successMsg) => {
  console.log(successData);
  if (successData.hasOwnProperty("code")) {
    return res.send({
      data: successData.sqlMessage,
      code: 500,
    });
  }
  res.send({
    data: successData,
    code: successCode,
    text: successMsg,
  });
};
