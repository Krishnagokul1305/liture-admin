export default function ListingHeaderSkeleton() {
  return (
    <div className="mb-8 flex flex-col md:flex-row gap-3 items-center justify-between animate-pulse">
      {/* "We found X courses" */}
      <div className="h-5 w-56 rounded bg-gray-200" />

      {/* Search bar */}
      <div className="flex gap-2 w-full md:w-72">
        <div className="h-10 w-full rounded-lg bg-gray-200" />
        <div className="h-10 w-10 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}
