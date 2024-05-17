'use client';

import { useSidebar } from '@/store/use-sidebar';
import { User } from '@prisma/client';
import UserItem, { UserItemSkeleton } from './user-item';

interface FollowingProps {
  users: User[];
}

export const Following = ({ users }: FollowingProps) => {
  const { collapsed } = useSidebar(state => state);

  if (!users.length) return null;

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {users.map(user => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={true}
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
