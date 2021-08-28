const mysql = require('mysql');
module.exports = {

	config: {
		host: '47.118.56.119',
		post: '3306',
		user: 'root',
		password: '980703',
		database: 'makefriends'
	},
	//promise回调
	SySqlConnect: function (sySql, sqlArr) {
		return new Promise((resolve, reject) => {
			var pool = mysql.createPool(this.config);
			pool.getConnection((err, conn) => {
				if (err) {
					reject(err)
				} else {
					conn.query(sySql, sqlArr, (err, data) => {
						if (err) {
							reject(err)
						} else {
							resolve(data)
						}
					});
					//释放链接
					conn.release();
				}
			})
		}).catch((err) => {
				return err
		})
	}
}
