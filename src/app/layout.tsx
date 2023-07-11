import "@/styles/globals.css";
import { FunctionComponent, ReactNode } from "react";
import { Metadata } from "next";
import { Navbar, Wrapper } from "@/components";
import { QueryProvider, SessionProvider } from "@/providers";
import { cn } from "@/utils/cn";
import { inter } from "@/utils/fonts";

export const metadata: Metadata = {
  title: "Prisma with Supabase Auth",
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: FunctionComponent<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-bg-primary text-text-primary antialiased",
          `${inter.variable} font-body`
        )}
      >
        <QueryProvider>
          <SessionProvider>
            <div className="flex h-screen flex-col">
              <Wrapper>
                <Navbar />
                <main className="flex-1">{children}</main>
              </Wrapper>
            </div>
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
