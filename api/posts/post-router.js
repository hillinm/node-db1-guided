const express = require('express')
const Post = require('./post-model')

const router = express.Router()

router.get('/', async (req, res, next) => {
  
  try {
    const data = await Post.get()
    res.status(201).json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkId, async (req, res, next) => {
  
  try {
    res.status(201).json(req.post)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkPayload, async (req, res, next) => {
  const body = req.body;
  
  try {
    const data = await Post.create(body);
    res.status(201).json(data);
  } catch(err) {
    next(err)
  }
})

router.put('/:id', checkId, checkPayload, async (req, res,next ) => {
  const { id } = req.params;
  const changes = req.body;
  
  try {
    const data = await Post.update(id, changes)
    res.status(201).json(data);
  } catch(err) {
    next(err);
  }
})

router.delete('/:id', checkId, async (req, res, next) => {
  
  try {
    const data = await Post.remove()
    res.status(201).json(data)
  } catch(err) {
    next(err)
  }
})

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack })
})

function checkId(req, res, next) {
  const { id } = req.params;
  try {
    const post = await Post.getById(id);
    if (post) {
      req.post = post;
      next();
    } else {
      res.status(400).json({message:'invalid id'});
      next(err);
    }
  } catch (err) {
    res.status(500).json({message: 'error retrieving a post'});
    next(err);
  }
}

function checkPayload(req, res, next) {
  const body = req.body;
  if (!body.title || !body.contents) {
    res.statusCode(400).json({message: 'body must inclue "title" and "contents"'});
    next()
  } else {
    res.statusCode(500).json({message: 'error retrieving post'});
    next(err)
  }
}

module.exports = router
