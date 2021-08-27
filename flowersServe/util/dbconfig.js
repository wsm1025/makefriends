const mysql = require('mysql');
module.exports = {
	//数据库配置
	config: {
		host: '47.118.56.119',
		post: '3306',
		user: 'root',
		password: '980703',
		database: 'makefriends'
	},
	sqlConnection: function (sql, sqlArr, cb) {
		//连接池，数据很大，减少数据查询时间
		var pool = mysql.createPool(this.config);
		pool.getConnection((err, conn) => {
			if (err) {
				console.log('链接失败');
				return;
			}
			//事件驱动回调
			conn.query(sql, sqlArr, cb);
			//释放链接
			conn.release();
			//此处可能会有问题，释放掉该链接
			// set global wait_timeout = 10;
		})
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
