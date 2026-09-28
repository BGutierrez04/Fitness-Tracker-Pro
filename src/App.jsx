import { Routes, Route } from "react-router";

import Layout from "./layout/Layout";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ActivitiesPage from "./activities/ActivitiesPage";
import ActivityPage from "./activities/ActivityPage";
import Error404 from "./Error404.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ActivitiesPage />} />

        <Route path="activities" element={<ActivitiesPage />} />

        <Route path="activities/:id" element={<ActivityPage />} />

        <Route path="register" element={<Register />} />

        <Route path="login" element={<Login />} />

        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
