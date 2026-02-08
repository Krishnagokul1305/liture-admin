"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Animated } from "../Animated";
import { fadeMove } from "@/app/utils/animations";
import { useRouter } from "next/navigation";
import { activities } from "@/service/constantservice";

function OpportunitiesSection() {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section
      className="bg-red-50/50 py-12 md:py-24 px-6 md:px-4 lg:px-8"
      id="opportunities"
    >
      <div className="mx-auto max-w-7xl">
        <Animated
          variants={fadeMove("up", 40, 0)}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12"
        >
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-black mb-6 text-balance">
              Explore <span className="text-primary">Our Opportunities</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl leading-relaxed">
              Discover webinars led by industry experts, exciting career
              opportunities, hands-on internships, and meaningful partnerships
              designed to help you learn, grow, and succeed.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => api?.scrollPrev()}
              size="icon"
              className="h-14 w-14 rounded-full"
              disabled={!api?.canScrollPrev()}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              onClick={() => api?.scrollNext()}
              size="icon"
              className="h-14 w-14 rounded-full"
              disabled={!api?.canScrollNext()}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </Animated>

        <Animated variants={fadeMove("up", 40, 0.25)}>
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {activities.map((activity, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="overflow-hidden rounded-lg h-full p-0">
                    <img
                      src={activity.image || "/placeholder.svg"}
                      alt={activity.title}
                      className="w-full h-72 object-cover"
                    />

                    <CardContent className="p-6 pt-0 space-y-4 flex flex-col">
                      <h2 className="text-2xl font-black text-gray-900">
                        {activity.title}
                      </h2>

                      <p className="text-gray-600 leading-relaxed">
                        {activity.description}
                      </p>

                      <div className="flex items-center justify-between pt-2 mt-auto">
                        <button
                          onClick={() => {
                            if (activity.external) {
                              window.open(
                                activity.path,
                                "_blank",
                                "noopener,noreferrer",
                              );
                            } else {
                              router.push(activity.path); // internal route
                            }
                          }}
                          className="text-primary font-bold text-sm hover:text-primary/90 cursor-pointer"
                        >
                          {activity.cta}
                        </button>

                        <span className="text-muted-foreground text-sm font-medium">
                          {activity.label}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </Animated>

        <Animated variants={fadeMove("up", 20, 0.35)}>
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  current === index ? "w-8 bg-primary" : "w-2 bg-gray-300"
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </Animated>
      </div>
    </section>
  );
}

export default OpportunitiesSection;
