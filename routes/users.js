const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const TOKEN_SECRET = 'express'

const tokenObj = {}

/* GET users listing. */
router.post('/login', function (req, res) {
	if (req.body.username === '123123' && req.body.password === '123123') {
		const userAccount = Object.values(req.body).join('&')

		const token = jwt.sign(userAccount, TOKEN_SECRET)

		tokenObj[userAccount] = token

		res.json({
			code: 200,
			msg: 'success',
			data: token
		})
	} else {
		res.json({
			code: 1,
			msg: 'fail',
			data: null
		})
	}
})

router.get('/validToken', (req, res) => {
	console.log(req.query, tokenObj)

	res.json({
		code: 1,
		msg: 'fail',
		data: null
	})
})

module.exports = router
