import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";

function Dashboard() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

export default Dashboard;
