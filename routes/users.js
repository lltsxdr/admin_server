const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const { auth, TOKEN_SECRET, User_database } = require('../public/javascripts/auth')

/* GET users listing. */
router.post('/login', function (req, res) {
	if (!req.body.username || !req.body.password) {
		return res.json({
			code: 1,
			msg: '非法参数',
			data: null
		})
	}

	const userAccount = Object.values(req.body).join('&')

	if (!User_database[req.body.username] || User_database[req.body.username].password !== req.body.password) {
		res.json({
			code: 1,
			msg: '账号或密码错误',
			data: null
		})
	} else {
		const token = jwt.sign(userAccount, TOKEN_SECRET)

		User_database[req.body.username].token = token

		res.json({
			code: 200,
			msg: 'success',
			data: {
				token,
				role: User_database[req.body.username].role,
				id: User_database[req.body.username].id,
			}
		})
	}
})

// 基本信息
router.get('/info', auth, (req, res) => {
	const account = jwt.decode(req.headers.authorization, TOKEN_SECRET)

	const [ username ] = account.split('&')

	res.json({
		code: 200,
		msg: 'success',
		data: {
			...User_database[username],
			password: undefined
		}
	})
})

// 修改密码
router.post('/modify', auth, (req, res) => {
	const { oldPwd, newPwd } = req.body

	const account = jwt.decode(req.headers.authorization, TOKEN_SECRET)

	const [ username, password ] = account.split('&')

	if (oldPwd !== password) {
		res.json({
			code: 1,
			msg: '密码不正确',
			data: null
		})
	} else {
		const newUserAccount = `${username}&${newPwd}`

		User_database[username].token = jwt.sign(newUserAccount, TOKEN_SECRET)
		User_database[username].password = newPwd

		res.json({
			code: -1,
			msg: '密码修改成功',
			data: null
		})
	}
})

// 退出登录
router.get('/logout', auth, (req, res) => {
	const account = jwt.decode(req.headers.authorization, TOKEN_SECRET)

	const [ username ] = account.split('&')

	User_database[username].token = ''

	res.json({
		code: 200,
		msg: '已成功退出登录',
		data: null
	})
})

router.get('/validToken', auth, (req, res) => {
	res.json({
		code: 200,
		msg: 'success',
		data: {
			auth: 1
		}
	})
})

module.exports = router
