import Spinner from "./spinner";

export default function LoaderComp() {
  return (
    <div className="flex justify-center items-center h-[350px]">
      <Spinner />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  );
}
