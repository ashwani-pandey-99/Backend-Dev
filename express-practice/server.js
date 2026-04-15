const express = require('express');
const path = require('path');
const responseTimeLogger = require('./middleware/responseTimeLogger');
const userRouter = require('./routes/users');
const blogRouter = require('./routes/blog');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(responseTimeLogger);
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { title: 'Express Practice' });
});

app.use('/users', userRouter);

app.get('/contact', (req, res) => {
  res.render('contact', { success: false, form: {} });
});

app.post('/contact', (req, res) => {
  const form = {
    name: req.body.name || '',
    email: req.body.email || '',
    message: req.body.message || '',
  };

  res.render('contact', { success: true, form });
});

app.get('/gallery', (req, res) => {
  const images = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'];
  res.render('gallery', { images });
});

app.use('/blog', blogRouter);

app.use((req, res) => {
  res.status(404).render('404', { url: req.originalUrl });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Express Practice app listening on http://localhost:${port}`);
  });
}

module.exports = app;
