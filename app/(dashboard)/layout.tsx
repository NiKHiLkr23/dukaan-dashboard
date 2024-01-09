export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex w-full ">{children}</div>;
}
