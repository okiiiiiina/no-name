import Header from "@/features/components/Header.server";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="m-5">{children}</main>
      </body>
    </html>
  );
}
