import PencilLoader from "../_components/PencilLoader";

export default function loading() {
  return (
    <div className="w-full h-screen relative">
      <div className="absolute inset-0 flex justify-center items-center">
        <PencilLoader />
      </div>
    </div>
  );
}
