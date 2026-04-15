const express = require('express');
const router = express.Router();

const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Martinez', email: 'bob@example.com' },
  { id: 3, name: 'Cara Nguyen', email: 'cara@example.com' },
  { id: 4, name: 'Daniel Kim', email: 'daniel@example.com' },
];

router.get('/', (req, res) => {
  const nameQuery = String(req.query.name || '').trim().toLowerCase();
  const filteredUsers = nameQuery
    ? users.filter((user) => user.name.toLowerCase().includes(nameQuery))
    : users;

  res.render('users', {
    users: filteredUsers,
    filter: req.query.name || '',
  });
});

module.exports = router;
