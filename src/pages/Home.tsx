import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div data-testid="home-page">
      <Link to="/editor/welcome.md">Open Editor</Link>
    </div>
  );
}