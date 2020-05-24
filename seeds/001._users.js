exports.seed = function (knex) {
  return knex('users').insert([
      {
        username: 'admin1',
        password: '$2b$12$26scIU5krTMh3UNZ1eHD0O0I0UKykNlx/UGjfMbxbLx8h9x.EOnnS',
        email: 'admin1@admin1.com',
      },
      {
        username: 'user2',
        password: '$2b$12$kMPndViVh5O8wlZv.nC.Iu2rCjZywdldO3qJgJBzAxIiwlFOuyzoq',
        email: 'user2@user2.com',
      },
      {
        username: 'test',
        password: '$2b$12$HcYOn7CcBHB58ua14esw9.GHNQmqJtfX19JtM0b2jI4GWM68RtTcS',
        email: 'test',
      }
    ])
};
