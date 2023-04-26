const express = require('express');
const router = express.Router();

const configs = require('../util/config')
const { setAsync, getAsync } = require("../redis");
const { REDIS_VISITS_COUNTER_KEY, REDIS_ADDED_TODOS_KEY } = require('../redis/constants')
const { getTodosCount } = require('../redis/helpers')

/* GET index data. */
router.get('/', async (req, res) => {
  const counter = await getAsync(REDIS_VISITS_COUNTER_KEY);
  const visits = !counter ? 1 : parseInt(counter) + 1;

  await setAsync(REDIS_VISITS_COUNTER_KEY, visits.toString());

  res.send({
    ...configs,
    visits
  });
});

router.get('/static', async (_req, res) => {
  const counter = await getTodosCount()
  res.json({ added_todos : counter })
})

module.exports = router;
