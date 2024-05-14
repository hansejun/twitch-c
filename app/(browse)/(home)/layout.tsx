import Navbar from '../_components/navbar';

export default function BrowserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <div className="flex h-full pt-20">{children}</div>
    </>
  );
}
