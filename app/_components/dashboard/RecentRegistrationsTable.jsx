import DataTable from "@/components/table/Table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRecentRegistration } from "@/service/statsService";

export default async function RecentRegistrationsTable() {
  const data = await getRecentRegistration();

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
            { accessorKey: "full_name", header: "Name" },
            { accessorKey: "email", header: "Email" },
            { accessorKey: "phone_number", header: "Phone" },
            { accessorKey: "type", header: "Type" },
            { accessorKey: "title", header: "Title" },
            { accessorKey: "created_at", header: "Registered On" },
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
