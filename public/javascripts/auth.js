const jwt = require('jsonwebtoken')
const TOKEN_SECRET = 'express'

const tokenArr = new Set()

tokenArr.add('123123&123123')

const auth = (req, res, next) => {
	const account = jwt.decode(req.headers.authorization, TOKEN_SECRET)

	const isLogin = tokenArr.has(`${account}@${req.headers.authorization}` ?? '')

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
	tokenArr
}
