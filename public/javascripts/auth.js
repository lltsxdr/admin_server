const jwt = require('jsonwebtoken')
const TOKEN_SECRET = 'express'

const User_database = {
	'admin': {
		id: 1,
		name: '姜老师',
		password: '123123',
		role: 1,
		token: '',
		gender: 1,
		age: 25,
		job: 8
	}
}

const auth = (req, res, next) => {
	const account = jwt.decode(req.headers.authorization, TOKEN_SECRET)

	const [ username ] = account.split('&')

	const isLogin = User_database[username].token === req.headers.authorization

	if (!isLogin) {
		res.json({
			code: -1,
			msg: '请登录',
			data: null
		})
	} else {
		next()
	}
}

module.exports = {
	auth,
	TOKEN_SECRET,
	User_database
}
