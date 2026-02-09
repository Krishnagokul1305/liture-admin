"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Animated } from "../Animated";
import { fadeMove } from "@/app/utils/animations";
import { useRouter } from "next/navigation";
import { activities } from "@/service/constantservice";
import { useRef } from "react";

function OpportunitiesSection() {
  const router = useRouter();
  const carouselRef = useRef(null);

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
        </Animated>

        <Animated variants={fadeMove("up", 40, 0.25)}>
          <Carousel
            ref={carouselRef}
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
            {/* Carousel controls centered at the bottom */}
            {/* <div className="flex items-center justify-center gap-0 mt-12 relative">
              <CarouselPrevious className="static translate-y-0 h-14 w-14 bg-primary text-white hover:bg-primary/90 rounded-full" />
              <CarouselNext className="static translate-y-0 h-14 w-14 bg-primary text-white hover:bg-primary/90 rounded-full" />
            </div> */}
          </Carousel>
        </Animated>
      </div>
    </section>
  );
}

export default OpportunitiesSection;
