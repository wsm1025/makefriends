module.exports = () => {
  return (err, req, res, next) => {
    if (err?.code) {
      res.status(200).send({
        data: err,
        msg: "token认证失效",
        code: 0
      })
    } else {
      res.status(500).send({
        data: null,
        msg: "服务超时",
        code: 0
      })
    }
  }
}