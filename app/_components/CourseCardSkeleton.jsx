export default function CourseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-sm bg-white shadow-sm animate-pulse">
      {/* Image */}
      <div className="h-48 w-full bg-gray-200" />

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-1/2 rounded bg-gray-200" />

        {/* Button */}
        <div className="h-10 w-full rounded bg-gray-200" />
      </div>
    </div>
  );
}
