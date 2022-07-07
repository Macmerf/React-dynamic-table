const casual = require("casual");

module.exports = () => {
  const data = { users: [] };
  for (let i = 0; i < 1000; i++) {
    data.users.push({
      id: casual.integer((from = 1), (to = 1000)),
      name: casual.name,
      birthday:casual.date(format = 'YYYY-MM-DD'),
      phone: casual.phone,
      email:casual.email,
      card_type: casual.card_type,
    });
  }
  return data;
};
