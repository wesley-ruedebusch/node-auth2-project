
exports.seed = function (knex) {

  const users = [
    {
      username: "wesley",
      password: "password",
      role: 1,
      department: "accounting"
    }
  ];

  return knex("users").insert(users);
};
