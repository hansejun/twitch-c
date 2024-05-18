'use client';

import { onBlock, onUnblock } from '@/actions/block';
import { onFollow, onUnfollow } from '@/actions/follow';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface ActionsProps {
  isFollowing: boolean;
  isBlocking: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, isBlocking, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then(data =>
          toast.success(`You are now following ${data.following.username}`),
        )
        .catch(() => toast.error('Failed to follow'));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then(data =>
          toast.success(
            `You are no longer following ${data.following.username}`,
          ),
        )
        .catch(() => toast.error('Failed to unfollow'));
    });
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then(data =>
          toast.success(`You have blocked ${data.blocked.username}`),
        )
        .catch(() => toast.error('Failed to block'));
    });
  };

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then(data =>
          toast.success(`You have unblocked ${data.blocked.username}`),
        )
        .catch(() => toast.error('Failed to unblock'));
    });
  };

  return (
    <>
      <Button
        disabled={isPending}
        onClick={isFollowing ? handleUnfollow : handleFollow}
        variant="primary"
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
      <Button
        disabled={isPending}
        onClick={isBlocking ? handleUnblock : handleBlock}
      >
        {isBlocking ? 'Unblock' : 'Block'}
      </Button>
    </>
  );
};
