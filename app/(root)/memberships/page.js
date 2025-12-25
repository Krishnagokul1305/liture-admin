import { EmptyState } from "@/app/_components/EmptyState";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { hasCurrentUserRole } from "@/service/userService";
import Modal from "@/app/_components/Modal";
import MembersCard from "@/app/_components/MembersCard";
import MembershipForm from "@/app/_components/forms/MemberShipForm";

async function page({ searchParams }) {
  if (!(await hasCurrentUserRole("SUPERADMIN", "ADMIN"))) {
    throw new Error("Unauthorized");
  }
  const MOCK_MEMBERSHIPS = [
    {
      id: "1",
      name: "Starter",
      description: "Perfect for individuals just getting started",
      price: 29,
      durationInDays: 30,
      benefits: [
        "5 GB Storage",
        "Basic Support",
        "Email Notifications",
        "Advanced Analytics",
      ],
      isActive: true,
    },
    {
      id: "2",
      name: "Professional",
      description: "For growing teams and power users",
      price: 79,
      durationInDays: 30,
      benefits: [
        "100 GB Storage",
        "Priority Support",
        "5 Team Members",
        "Advanced Analytics",
      ],
      isActive: true,
    },
    {
      id: "3",
      name: "Enterprise",
      description: "Custom solution for large organizations",
      price: 299,
      durationInDays: 90,
      benefits: [
        "Unlimited Storage",
        "24/7 Support",
        "Unlimited Users",
        "Custom Integration",
      ],
      isActive: true,
    },
    {
      id: "4",
      name: "Premium Plus",
      description: "Enhanced features for serious users",
      price: 149,
      durationInDays: 30,
      benefits: [
        "500 GB Storage",
        "Premium Support",
        "API Access",
        "Custom Branding",
      ],
      isActive: true,
    },
    {
      id: "5",
      name: "Starter Plus",
      description: "Upgrade from starter with more features",
      price: 49,
      durationInDays: 30,
      benefits: ["20 GB Storage", "Standard Support", "2 Team Members"],
      isActive: true,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex md:items-center  flex-col lg:flex-row justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-3xl font-bold">
            Membership Management
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Create, manage, and showcase your membership tiers
          </p>
        </div>
        <Modal
          title="Create Membership"
          description="Add a new membership plan."
          Trigger={
            <Button className={"mt-5 lg:mt-0"}>
              <Plus /> New Membership
            </Button>
          }
        >
          <MembershipForm />
        </Modal>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_MEMBERSHIPS.map((membership) => (
          <MembersCard key={membership.id} membership={membership} />
        ))}
      </div>
    </div>
  );
}

export default page;
