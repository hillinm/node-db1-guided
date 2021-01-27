const db = require('../../data/db-config.js');

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}

async function get() {
  const sql = await db('posts').toString();
  console.log(sql);

  const posts = await db('posts');
  return posts;
}

async function getById(id) {
  const [post] = await db('posts').where({id});
  return post;
}

async function create(data) {
  const [postId] = await db('posts').insert(data);
  const post = getById(postId);
  return post;
}

async function update(id, changes) {
  const count = await db('post').where({id}).update(changes);
  return count;
}

async function remove() {
  const count = await db()
}
