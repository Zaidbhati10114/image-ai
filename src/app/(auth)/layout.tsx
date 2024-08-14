interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-full bg-[url(/bg-small.jpg)] bg-top bg-cover w-full flex flex-col">
      <div className="z-[4] h-full w-full flex flex-col items-center justify-center">
        <div className="w-full h-full md:h-auto md:w-[420px]">{children}</div>
      </div>
      <div className="fixed inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.8),rgba(0,0,0,0.4),rgba(0,0,0,0.8))] z-[1]" />
    </div>
  );
}
