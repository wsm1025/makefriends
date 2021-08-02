module.exports  = (res,successData,successCode,successMsg) =>{
 if (successData.hasOwnProperty('code')) {
    return res.send({
        data: successData.sqlMessage,
        "code": 500,
    })
}
res.send({
    data:successData,
    "code": successCode,
    "text": successMsg
})
}