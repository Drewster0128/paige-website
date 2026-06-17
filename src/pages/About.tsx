import { NavLink } from "react-router";
import { PageLayout } from "./PageLayout";

export function About(): React.JSX.Element {
  return (
    <PageLayout title="About">
      <div className="flex flex-col gap-6">
        <p>
          Paige Cook is the artist behind Psychedelic Queen Artistry. Her
          portfolio includes colorful paintings, illustrations, custom pieces,
          sculpture, and mixed-media work.
        </p>
        <p>
          This site collects her projects in one place and will continue to
          grow as new work is completed.
        </p>
        <NavLink className="w-fit underline" to="/gallery">
          Explore the gallery
        </NavLink>
      </div>
    </PageLayout>
  );
}
