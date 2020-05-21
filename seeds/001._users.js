exports.seed = function (knex) {
  return knex('users').insert([
      { username: 'admin1', password: '$2b$12$26scIU5krTMh3UNZ1eHD0O0I0UKykNlx/UGjfMbxbLx8h9x.EOnnS' },
      { username: 'user2', password: '$2b$12$kMPndViVh5O8wlZv.nC.Iu2rCjZywdldO3qJgJBzAxIiwlFOuyzoq' },
    ])
};
