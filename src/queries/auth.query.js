module.exports = {
  loginQuery: (email) =>
    `SELECT user_id, username, password, email, first_name, last_name, role, manager_id
FROM u682599449_pr_management.Users
WHERE email='${email}';`,
};
