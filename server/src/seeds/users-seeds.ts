import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    {
      username: 'user1',
      password: 'password',
      email: 'user1@example.com',
    },
    {
      username: 'user2',
      password: 'password',
      email: 'user2@example.com',
    },
  ]);
};