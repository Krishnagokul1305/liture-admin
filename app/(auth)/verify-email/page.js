import { AlertCircle } from "lucide-react";
import VerifyEmailForm from "@/app/_components/forms/VerifyEmailForm";

async function page({ searchParams }) {
  const params = await searchParams;
  if (!params?.token) {
    return (
      <div className="w-full max-w-md">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-destructive/10 p-4 rounded-full">
              <AlertCircle className="w-10 h-10 text-destructive" />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-foreground">Invalid Link</h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              The verification link is invalid or expired.
            </p>
          </div>
        </div>
      </div>
    );
  }
  return <VerifyEmailForm token={params?.token} />;
}

export default page;
