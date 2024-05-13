import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <main className="">
      main
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
