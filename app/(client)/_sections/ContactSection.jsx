import { Facebook, Instagram, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Animated } from "../_components/Animated";
import { container, fadeMove } from "@/app/utils/animations";

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <section
      className="min-h-[70vh] flex flex-col w-full lg:flex-row"
      id="contact"
    >
      {/* Left side - Contact Info */}
      <div className="bg-primary text-primary-foreground w-full flex md:justify-end md:p-0 py-10">
        {/* container */}
        <Animated
          variants={fadeMove("up", 30, 0)}
          className="flex flex-col justify-between h-full  p-8 md:p-12 lg:p-16"
        >
          <div className="space-y-12">
            <h1 className="text-5xl md:text-6xl font-black tracking-tight">
              CONTACTS
            </h1>

            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tight">PHONE</h2>
              <div className="space-y-1">
                <p className="text-lg">(406) 555-0120</p>
                <p className="text-lg">(316) 555-0116</p>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tight">
                Support Hours
              </h2>
              <div className="space-y-0.5">
                <p className="text-lg">Monday – Saturday</p>
                <p className="text-lg"> 9:00 AM – 7:00 PM</p>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tight">MAIL</h2>
              <p className="text-lg">support@litureedtech.com</p>
            </div>
          </div>

          {/* <div className="flex gap-4 mt-12 lg:mt-0 text-white">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Facebook"
            >
              <Phone className="w-6 h-6" color="white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" color="white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="X (Twitter)"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6"
                fill="currentColor"
                color="white"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div> */}
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
            <form onSubmit={handleSubmit} className="space-y-6 mb-10">
              <Animated variants={fadeMove("up", 20)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold uppercase">NAME</Label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="bg-transparent border-gray-100/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold uppercase">PHONE</Label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone"
                      className="bg-transparent border-gray-100/20"
                    />
                  </div>
                </div>
              </Animated>

              <Animated variants={fadeMove("up", 20)}>
                <div className="space-y-2">
                  <Label className="text-sm font-bold uppercase">EMAIL</Label>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className="bg-transparent border-gray-100/20"
                  />
                </div>
              </Animated>

              <Animated variants={fadeMove("up", 20)}>
                <div className="space-y-2">
                  <Label className="text-sm font-bold uppercase">MESSAGE</Label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Message"
                    className="bg-transparent border-gray-100/20 resize-none"
                  />
                </div>
              </Animated>

              <Animated variants={fadeMove("up", 20)}>
                <Button
                  type="submit"
                  className="w-full py-6 font-bold uppercase"
                >
                  Submit
                </Button>
              </Animated>
            </form>
          </Animated>

          <div className="text-center text-sm space-y-1 text-muted-foreground">
            <p>© Liture. All rights reserved.</p>
            {/* <p>Designed with passion.</p> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
