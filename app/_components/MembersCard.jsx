"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Modal from "./Modal";
import MembershipForm from "./forms/MemberShipForm";
import DeleteModal from "./DeleteModal";
import { deleteInternshipAction, deleteMembershipAction } from "../lib/action";

export default function MembersCard({ membership }) {
  const isInactive = !membership.isActive;

  return (
    <div
      className={`group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-sm transition-all duration-300 ${
        isInactive ? "opacity-50" : ""
      }`}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50"></div>

      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-xl lg:text-2xl font-bold text-foreground">
            {membership.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {membership.description}
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {membership.benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{benefit}</span>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <Modal
            title="Edit Membership"
            description="Modify membership information."
            Trigger={
              <Button
                className="flex-1 border-border w-full"
                variant={"outline"}
              >
                Edit
              </Button>
            }
          >
            <MembershipForm initialData={membership} mode="edit" />
          </Modal>
          <DeleteModal
            onDelete={async () => await deleteMembershipAction(membership?._id)}
            trigger={
              <Button className="flex-1 border-border w-full">Delete</Button>
            }
          />
        </div>
      </div>
    </div>
  );
}
