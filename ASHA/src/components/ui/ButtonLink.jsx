import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
  <Link to={to} className="bg-green-700 hover:bg-zinc-50 hover:text-zinc-950 px-4 py-1 rounded-md">
    {children}
  </Link>
);
