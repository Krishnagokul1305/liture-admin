import DataTable from "@/components/table/Table";
import { getRecentRegistrations } from "@/service/registrationService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function RecentRegistrationsTable() {
  const data = await getRecentRegistrations();

  return (
    <Card className={"pb-0"}>
      <CardHeader>
        <CardTitle>Recent Registrations</CardTitle>
        <CardDescription>
          Latest internship and webinar registrations
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 border-t">
        <DataTable
          columnCofig={[
            { accessorKey: "fullName", header: "Name" },
            { accessorKey: "email", header: "Email" },
            { accessorKey: "phoneNumber", header: "Phone" },
            { accessorKey: "type", header: "Type" },
            { accessorKey: "title", header: "Title" },
            { accessorKey: "createdAt", header: "Registered On" },
          ]}
          data={data}
          count={data.length}
          isNeededHeader={true}
          isNeededPagination={false}
        />
      </CardContent>
    </Card>
  );
}
