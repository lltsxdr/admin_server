const express = require('express')
const router = express.Router()
const randomName = require('chinese-random-name')
const { random } = require('lodash')
const { auth } = require('../public/javascripts/auth')

const jobDic = new Map([
	[ 1, 'FrontEnd Developer' ],
	[ 2, 'BackEnd Developer' ],
	[ 3, 'Java' ],
	[ 4, 'Go' ],
	[ 5, 'PHP' ],
	[ 6, 'C' ],
	[ 7, 'Python' ],
	[ 8, 'Vue' ],
	[ 9, 'React' ],
	[ 10, 'Angular' ],
])

const tableData = [
	{ id: 0, name: '贺劝', gender: 1, age: 33, job: 5 },
	{ id: 1, name: '陈映', gender: 0, age: 29, job: 1 },
	{ id: 2, name: '孙网南', gender: 0, age: 35, job: 4 },
	{ id: 3, name: '吴笺兄', gender: 0, age: 30, job: 6 },
	{ id: 4, name: '蒋环组', gender: 0, age: 31, job: 5 },
	{ id: 5, name: '费姑枫', gender: 0, age: 31, job: 6 },
	{ id: 6, name: '曹娜板', gender: 1, age: 29, job: 4 },
	{ id: 7, name: '戚赖', gender: 0, age: 21, job: 3 },
	{ id: 8, name: '殷贸眉佐', gender: 0, age: 21, job: 7 },
	{ id: 9, name: '章洋肴', gender: 0, age: 25, job: 5 },
	{ id: 10, name: '酆尉烨', gender: 1, age: 33, job: 8 },
	{ id: 11, name: '戚妇', gender: 1, age: 23, job: 10 },
	{ id: 12, name: '费飘旃', gender: 1, age: 24, job: 3 },
	{ id: 13, name: '花骑柳', gender: 0, age: 30, job: 3 },
	{ id: 14, name: '鲍渔版', gender: 0, age: 32, job: 6 },
	{ id: 15, name: '雷影', gender: 1, age: 34, job: 7 },
	{ id: 16, name: '钱缄', gender: 0, age: 29, job: 1 },
	{ id: 17, name: '花励', gender: 1, age: 34, job: 5 },
	{ id: 18, name: '姜勤本', gender: 1, age: 35, job: 10 },
	{ id: 19, name: '冯状', gender: 1, age: 35, job: 1 },
	{ id: 20, name: '柳双', gender: 1, age: 24, job: 7 },
	{ id: 21, name: '李财铁', gender: 1, age: 30, job: 6 },
	{ id: 22, name: '郎摘耶', gender: 0, age: 34, job: 5 },
	{ id: 23, name: '费谈软', gender: 1, age: 22, job: 7 },
	{ id: 24, name: '施徽', gender: 1, age: 29, job: 7 },
	{ id: 25, name: '张壁山', gender: 0, age: 25, job: 5 },
	{ id: 26, name: '韦杨度', gender: 1, age: 34, job: 10 },
	{ id: 27, name: '倪庶略劫', gender: 0, age: 22, job: 6 },
	{ id: 28, name: '杨南域', gender: 0, age: 29, job: 7 },
	{ id: 29, name: '喻号', gender: 1, age: 28, job: 3 },
	{ id: 30, name: '吕钏晨', gender: 0, age: 25, job: 2 },
	{ id: 31, name: '何茶', gender: 0, age: 30, job: 5 },
	{ id: 32, name: '云肋瀜', gender: 1, age: 35, job: 10 },
	{ id: 33, name: '姜乳', gender: 0, age: 30, job: 1 },
	{ id: 34, name: '汤予', gender: 0, age: 22, job: 6 },
	{ id: 35, name: '罗逸', gender: 1, age: 30, job: 7 },
	{ id: 36, name: '孙药显', gender: 1, age: 28, job: 6 },
	{ id: 37, name: '方唯', gender: 0, age: 34, job: 8 },
	{ id: 38, name: '柏坡', gender: 1, age: 29, job: 10 },
	{ id: 39, name: '凤伊哄', gender: 1, age: 25, job: 4 },
	{ id: 40, name: '喻陪', gender: 0, age: 34, job: 7 },
	{ id: 41, name: '任口', gender: 1, age: 25, job: 2 },
	{ id: 42, name: '秦甯使琇', gender: 0, age: 33, job: 3 },
	{ id: 43, name: '华秦巽', gender: 1, age: 26, job: 2 },
	{ id: 44, name: '郎磐', gender: 0, age: 32, job: 9 },
	{ id: 45, name: '岑谈货', gender: 0, age: 26, job: 9 },
	{ id: 46, name: '方叶勺', gender: 0, age: 28, job: 6 },
	{ id: 47, name: '鲍奖缠', gender: 1, age: 29, job: 2 },
	{ id: 48, name: '严西近', gender: 1, age: 28, job: 2 },
	{ id: 49, name: '葛握', gender: 0, age: 27, job: 1 }
]

// 查询表格数据
router.post('/userList', auth, (req, res) => {
	res.json({
		code: 200,
		msg: 'success',
		data: !Object.keys(req.body).length
			? tableData
			: tableData.filter(e =>
				e.name === Number(req.body?.name) ||
				e.gender === Number(req.body?.gender) ||
				e.job === Number(req.body?.job)
			)
	})
})

// 新增
router.post('/userList/add', auth, (req, res) => {
	if (req.body.name && req.body.gender && req.body.job && req.body.age) {
		tableData.push({
			...req.body,
			id: tableData.length
		})

		res.json({
			code: 200,
			msg: '新增成功',
			data: null
		})
	} else {
		res.json({
			code: 1,
			msg: '填写完整人员配置',
			data: null
		})
	}
})

// 修改
router.post('/userList/edit', auth, (req, res) => {
	if (req.body.name && req.body.gender && req.body.job && req.body.age && req.body.id) {
		const exist = tableData.find(e => e.id === +req.body.id)

		if (exist) {
			tableData[+req.body.id] = req.body

			res.json({
				code: 200,
				msg: '新增成功',
				data: null
			})
		} else {
			res.json({
				code: 1,
				msg: '修改的用户不存在',
				data: null
			})
		}
	} else {
		res.json({
			code: 1,
			msg: '填写完整人员配置',
			data: null
		})
	}
})

// 删除
router.post('/userList/delete', auth, (req, res) => {
	if (req.body.id) {
		const exist = tableData.find(e => e.id === +req.body.id)

		if (exist) {
			delete tableData[+req.body.id]

			res.json({
				code: 200,
				msg: '删除成功',
				data: null
			})
		} else {
			res.json({
				code: 1,
				msg: '要删除的用户不存在',
				data: null
			})
		}
	} else {
		res.json({
			code: 1,
			msg: '没有要删除的用户ID',
			data: null
		})
	}
})

module.exports = router
