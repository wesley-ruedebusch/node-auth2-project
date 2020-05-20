
exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const roles = [
    {
      name: "admin", 
    },
    {
      name: "user", 
    },
    {
      name: "guest", 
    },
  ];

  return knex("roles").insert(roles);
};
