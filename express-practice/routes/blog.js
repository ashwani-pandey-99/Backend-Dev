const express = require('express');
const router = express.Router();

const posts = [
  {
    id: 1,
    title: 'Welcome to the Blog',
    slug: 'welcome-to-the-blog',
    body: 'This is the first post in the simple blog example.',
    createdAt: new Date('2026-04-01T10:00:00Z'),
  },
  {
    id: 2,
    title: 'Express and EJS',
    slug: 'express-and-ejs',
    body: 'Express and EJS are a great combination for server-rendered web pages.',
    createdAt: new Date('2026-04-05T12:30:00Z'),
  },
];

router.get('/', (req, res) => {
  res.render('blog-list', { posts });
});

router.get('/new', (req, res) => {
  res.render('new-post', { errors: [], form: {} });
});

router.post('/new', (req, res) => {
  const { title = '', body = '' } = req.body;
  const errors = [];

  if (!title.trim()) {
    errors.push('Title is required.');
  }

  if (!body.trim()) {
    errors.push('Body is required.');
  }

  if (errors.length) {
    return res.render('new-post', { errors, form: { title, body } });
  }

  const slug = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  posts.push({
    id: posts.length + 1,
    title: title.trim(),
    slug,
    body: body.trim(),
    createdAt: new Date(),
  });

  res.redirect('/blog');
});

router.get('/:slug', (req, res) => {
  const post = posts.find((item) => item.slug === req.params.slug);

  if (!post) {
    return res.status(404).render('404', { url: req.originalUrl });
  }

  res.render('blog-post', { post });
});

module.exports = router;
