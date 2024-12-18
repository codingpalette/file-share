import { SideBar } from "@renderer/widgets/side-bar/ui";


interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({children}: MainLayoutProps) {
  return (
    <>
      <div className="pl-[75px]">
        <SideBar />
        <main className="text-neutral-50 p-4">
          {children}
        </main>
      </div>
    </>
  )
}
