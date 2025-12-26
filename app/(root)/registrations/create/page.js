import RegistrationForm from "@/app/_components/forms/RegistrationForm";

function page() {
  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Registration</h1>
        <p className="text-muted-foreground mt-2">
          Register for an internship or webinar opportunity
        </p>
      </div>
      <RegistrationForm />
    </div>
  );
}

export default page;
