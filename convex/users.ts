import { query } from './_generated/server';

export const getAllUsers = query({
  args: {},
  handler: async ctx => {
    console.log('getAllUsers');
    return await ctx.db.query('users').collect();
  },
});
