'use client';

import { onFollow, onUnfollow } from '@/actions/follow';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
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

  return (
    <Button
      disabled={isPending}
      onClick={isFollowing ? handleUnfollow : handleFollow}
      variant="primary"
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};
