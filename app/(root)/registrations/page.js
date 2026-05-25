import ClientRegistration from "@/app/_components/ClientRegistration";
import { getCurrentUser } from "@/service/userService";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function page({ searchParams }) {
  const currentUser = await getCurrentUser().catch(() => null);
  if (!currentUser) {
    redirect("/login");
  }

  const userName = currentUser?.name || "User";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-background text-foreground mt-10">
      <div className="relative w-full overflow-hidden border-b border-primary/20 bg-primary py-12 text-primary-foreground md:py-16">
        <div className="pointer-events-none absolute top-0 right-1/4 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-between gap-6 px-6 sm:flex-row sm:items-center md:px-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-lg font-bold text-white ring-1 ring-white/20 shadow-sm backdrop-blur">
              {userInitial}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary-foreground/75">
                <span>User Portal</span>
                <span className="h-1 w-1 rounded-full bg-primary-foreground/40" />
                <span>{userName}</span>
              </div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-white md:text-4xl">
                My Registrations
              </h1>
            </div>
          </div>

          <p className="max-w-xs text-sm font-medium leading-relaxed text-primary-foreground/80 sm:text-right">
            Track, sort, and manage your applications, active events, and entry
            logs.
          </p>
        </div>
      </div>

      <div>
        <ClientRegistration searchParams={searchParams} />
      </div>
    </div>
  );
}

export default page;
