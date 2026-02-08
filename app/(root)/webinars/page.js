import { Animated } from "@/app/_components/Animated";
import Searchbar from "@/app/_components/Searchbar";
import WebinarListing from "@/app/_components/WebinarListing";
import { container, fadeMove } from "@/app/utils/animations";

async function page({ searchParams }) {
  const search = await searchParams;
  return (
    <div className="min-h-screen mt-16">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-primary/80 dark:from-primary/70 dark:via-primary dark:to-primary/60">
        {/* Diagonal pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-25
              bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_1px,transparent_1px)]
              bg-[length:80px_80px]"
        />

        <Animated
          variants={container(0.2)}
          className="relative mx-auto max-w-7xl px-6 py-16 text-center"
        >
          <Animated variants={fadeMove("up", 30)}>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Explore Webinars
            </h1>
          </Animated>

          <Animated variants={fadeMove("up", 30, 0.15)}>
            <p className="mx-auto max-w-2xl text-primary-foreground/90 line-clamp-2">
              Expert-led webinars on emerging tech, design, careers, AI, and
              personal branding with live interaction and recorded access.
            </p>
          </Animated>
        </Animated>
      </div>
      <div className="max-w-7xl mx-auto py-16 px-6">
        <Animated
          variants={container(0.15)}
          className="mb-8 flex flex-col md:flex-row gap-3 items-center justify-between"
        >
          <Animated variants={fadeMove("up", 20)}>
            <p className="text-lg font-medium text-gray-900">
              Webinars for you
            </p>
          </Animated>

          <Animated
            variants={fadeMove("up", 20, 0.1)}
            className="w-full md:w-fit"
          >
            <Searchbar />
          </Animated>
        </Animated>
        <WebinarListing searchParams={search} />
      </div>
    </div>
  );
}

export default page;
