import "@/styles/globals.css";
import { ReactNode } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";
import { cookies } from "next/headers";
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

const RootLayout = async ({ children }: RootLayoutProps) => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-bg-primary text-text-primary antialiased",
          `${inter.variable} font-body`
        )}
      >
        <QueryProvider>
          <SessionProvider session={session}>
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
