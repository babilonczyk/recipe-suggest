import { Outlet } from "react-router-dom";
import Navbar from "../shared/components/navbar";

const RootLayoout = () => {
  return (
    <div className="bg-white">
      <Navbar> </Navbar>
      <Outlet />
    </div>
  );
};

export default RootLayoout;
