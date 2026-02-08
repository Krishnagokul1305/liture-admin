import { EmptyState } from "@/app/_components/EmptyState";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getCurrentUserStatus } from "@/service/userService";
import Modal from "@/app/_components/Modal";
import MembersCard from "@/app/_components/MembersCard";
import MembershipForm from "@/app/_components/forms/MemberShipForm";
import { getAllMemberships } from "@/service/membershipService";

async function page({ searchParams }) {
  const { isAdmin, isStaff } = await getCurrentUserStatus();
  if (!isAdmin && !isStaff) {
    throw new Error("Unauthorized");
  }
  const param = await searchParams;
  const data = await getAllMemberships(param);

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
      {data?.length == 0 ? (
        <EmptyState
          title="No Memberships yet"
          message="There aren't any memberships at the moment"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((membership) => (
            <MembersCard key={membership.id} membership={membership} />
          ))}
        </div>
      )}
    </div>
  );
}

export default page;
