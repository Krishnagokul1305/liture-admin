import { NextResponse } from "next/server";
import { getAllInternshipRegistrations } from "@/service/internshipService";
import { getAllWebinarRegistrations } from "@/service/webinarService";
import { getAllMembershipRegistrations } from "@/service/membershipService";

const registrationFetchers = {
  internships: getAllInternshipRegistrations,
  webinars: getAllWebinarRegistrations,
  memberships: getAllMembershipRegistrations,
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const type = searchParams.get("type") || "internships";
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 6);
    const search = searchParams.get("search") || "";

    const fetchRegistrations =
      registrationFetchers[type] || getAllInternshipRegistrations;

    const data = await fetchRegistrations({
      search,
      page,
      limit,
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error?.message || "Failed to fetch registrations" },
      { status: 500 },
    );
  }
}
