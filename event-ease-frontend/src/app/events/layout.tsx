export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[url('/background.svg')] bg-fixed min-h-full -mt-17 bg-cover bg-center scroll-smooth">
      {children}
    </div>
  );
}
