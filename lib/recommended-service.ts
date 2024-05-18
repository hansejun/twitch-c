import { db } from './db';
import { getSelf } from './auth-service';

export const getRecommended = async () => {
  let userId;

  try {
    const self = await getSelf();

    userId = self.id;
  } catch (e) {
    userId = null;
  }

  let users = [];

  // 내가 팔로잉하고 있는 유저들과 본인을 제외한 유저들을 가져온다.
  if (userId) {
    users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId,
                },
              },
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  return users;
};
