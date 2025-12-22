import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function page() {
  return (
    <div>
      <div className="flex md:items-center flex-col lg:flex-row justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Users Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage user roles and permissions
          </p>
        </div>
        <Button className={"mt-5 lg:mt-0"}>
          <Plus /> Add User
        </Button>
      </div>
    </div>
  );
}

export default page;
