'use server';

import { blockUser, unblockUser } from '@/lib/block-service';
import { revalidatePath } from 'next/cache';

/** 해당 유저 차단시키기 */
export const onBlock = async (id: string) => {
  const blockedUser = await blockUser(id);

  revalidatePath('/');

  if (blockedUser) {
    revalidatePath(`/${blockedUser.blocked.username}`);
  }

  return blockedUser;
};

/** 해당 유저 차단 해제하기 */
export const onUnblock = async (id: string) => {
  const blockedUser = await unblockUser(id);

  revalidatePath('/');

  if (blockedUser) {
    revalidatePath(`/${blockedUser.blocked.username}`);
  }

  return blockedUser;
};
