const express = require('express');
const router = express.Router();
const models = require('../../models')
const { successSend} = require('../../utils/utils.js')

router.get('/', async (req, res) => {
  let {name} = req.query;
  console.log(req.query)
  let user = await models.User.create({
    name,
  })
  res.send(successSend('ok', user))
})

router.get('/user', async (req, res) => {
  let userList = await models.User.findAll();
  res.send(successSend('ok', userList))
})

/**
 * req.params  查询url参数
 */
router.get('/user/:id', async (req, res) => {
  let {id} = req.params;
  console.log(req)
  let userDetail = await models.User.findOne({
    where: {id}
  });
  res.send(successSend('ok', userDetail))
})

module.exports = router;