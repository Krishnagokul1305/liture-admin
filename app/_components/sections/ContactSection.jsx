"use client";
import { Facebook, Instagram, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Animated } from "../Animated";
import { fadeMove, container } from "@/app/utils/animations";
import { API_BASE } from "@/service/constantservice";
import { toast } from "sonner";

function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message);
      }
      toast.success("Message sent successfully ✅");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <section
      className="min-h-[70vh] flex flex-col w-full lg:flex-row"
      id="contact"
    >
      <div className="bg-primary text-primary-foreground w-full flex md:justify-end md:p-0 py-10">
        <Animated
          variants={fadeMove("up", 30, 0)}
          className="flex flex-col justify-between h-full p-8 md:p-12 lg:p-16"
        >
          <div className="space-y-12">
            <h1 className="text-5xl md:text-6xl font-black tracking-tight">
              CONTACTS
            </h1>

            {/* Phone */}
            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tight">PHONE</h2>
              <div className="space-y-1 grid grid-cols-1 gap-0.5">
                <a href="tel:+919443927255" className="text-lg hover:underline">
                  (+91) 94439 27255
                </a>
                <a href="tel:+919361783438" className="text-lg hover:underline">
                  (+91) 93617 83438
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tight">
                SUPPORT HOURS
              </h2>
              <div className="space-y-0.5">
                <p className="text-lg">Monday – Saturday</p>
                <p className="text-lg">9:00 AM – 7:00 PM</p>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tight">MAIL</h2>
              <a
                href="mailto:lituretech@gmail.com"
                className="text-lg hover:underline"
              >
                lituretech@gmail.com
              </a>
            </div>
          </div>

          {/* Social Icons (optional) */}
          {/* 
    <div className="flex gap-4 mt-12 lg:mt-0 text-white">
      <a
        href="#"
        className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity"
        aria-label="Phone"
      >
        <Phone className="w-6 h-6" />
      </a>
      <a
        href="#"
        className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity"
        aria-label="Instagram"
      >
        <Instagram className="w-6 h-6" />
      </a>
    </div>
    */}
        </Animated>
      </div>

      {/* Right side - Contact Form */}
      <div className="bg-[#2B2B2B] text-white w-full p-8 py-10 md:p-12 lg:p-16 flex flex-col justify-between">
        <div className="lg:w-xl">
          <Animated
            variants={fadeMove("up", 30, 0.1)}
            className="text-4xl md:text-5xl font-black tracking-tight mb-8 md:mb-12"
          >
            {"LET'S "}
            <span className="text-primary">GET IN TOUCH</span>
          </Animated>

          <Animated variants={container(0.15)}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-10">
              {/* NAME */}
              <Animated variants={fadeMove("up", 20)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold uppercase">NAME</Label>
                    <Input
                      placeholder="Your name"
                      className="bg-transparent border-gray-100/20"
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-400">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* PHONE */}
                  <div className="space-y-1">
                    <Label className="text-sm font-bold uppercase">PHONE</Label>
                    <Input
                      placeholder="Your phone"
                      className="bg-transparent border-gray-100/20"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Enter a valid 10-digit phone number",
                        },
                      })}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-400">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
              </Animated>

              {/* EMAIL */}
              <Animated variants={fadeMove("up", 20)}>
                <div className="space-y-1">
                  <Label className="text-sm font-bold uppercase">EMAIL</Label>
                  <Input
                    placeholder="Your email"
                    className="bg-transparent border-gray-100/20"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </Animated>

              {/* MESSAGE */}
              <Animated variants={fadeMove("up", 20)}>
                <div className="space-y-1">
                  <Label className="text-sm font-bold uppercase">MESSAGE</Label>
                  <Textarea
                    rows={5}
                    placeholder="Message"
                    className="bg-transparent border-gray-100/20 resize-none"
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                    })}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </Animated>

              {/* SUBMIT */}
              <Animated variants={fadeMove("up", 20)}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 font-bold uppercase"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </Animated>
            </form>
          </Animated>

          <div className="text-center text-sm space-y-1 text-muted-foreground">
            <p>© Liture. All rights reserved.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
