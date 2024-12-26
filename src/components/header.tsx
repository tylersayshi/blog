import { Link } from "waku";
import { Face } from "./face";

export const Header = () => {
  return (
    <header className="flex items-center gap-4 p-6 lg:fixed lg:left-0 lg:top-0 lg:right-0 justify-between w-full">
      <h2 className="text-lg font-bold tracking-tight">
        <Link to="/">༼ ╹‿╹ ༽</Link>
      </h2>
      <Face height={50} />
    </header>
  );
};
