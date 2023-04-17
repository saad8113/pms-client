import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import "../../css/sidebar.css";

function Sidebar() {
  return (
    <>
      <div>
        <Link to="/dashboard/projects/all">Projects</Link>
        <Link to="/dashboard/projects/archived">Archived</Link>
        <Link
          to="/dashboard/projects/completed
"
        >
          Completed
        </Link>
      </div>

      <div>
        <Button>Logout</Button>
      </div>
    </>
  );
}

export default Sidebar;
