import { Logo } from '../(browse)/_components/navbar/logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-8">
      <Logo />
      {children}
    </div>
  );
}
