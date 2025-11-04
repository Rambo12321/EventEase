export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[url('/background.svg')] bg-fixed min-h-full -mt-17 bg-cover bg-center">
      <div className="pt-20">
        <h1 className="font-bold font-shadows text-8xl text-amber-300 text-center">
          All events of user 👇🏻
        </h1>
      </div>
      {children}
    </div>
  );
}
