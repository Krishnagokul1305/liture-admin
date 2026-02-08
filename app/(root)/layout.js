import Header from "../_components/Header";

export const metadata = {
  title: "Liture EdTech — Learning & Careers",
  description:
    "Liture EdTech is a career-focused education platform offering expert webinars, internships, membership benefits, and career support to learners and professionals.",
};

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
