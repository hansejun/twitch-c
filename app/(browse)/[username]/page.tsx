import { isFollowingUser } from '@/lib/follow-service';
import { getUserByUsername } from '@/lib/user-service';
import { notFound } from 'next/navigation';
import { Actions } from './_components/actions';
import { hasBlockedUser, isBlockedByUser } from '@/lib/block-service';

interface UserPageProps {
  params: {
    username: string;
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocking = await hasBlockedUser(user.id);

  return (
    <div className="flex flex-col gap-y-4 ">
      <p>username:{user.username}</p>
      <p>user ID: {user.id}</p>
      <p>is Following: {isFollowing ? 'Yes' : 'No'}</p>
      <p>is Blocking: {isBlocking ? 'Yes' : 'No'}</p>
      <Actions
        isFollowing={isFollowing}
        isBlocking={isBlocking}
        userId={user.id}
      />
    </div>
  );
}
