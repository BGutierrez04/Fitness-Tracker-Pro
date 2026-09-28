import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { getActivity, deleteActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

export default function ActivityPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);

  const loadActivity = async () => {
    const data = await getActivity(id);
    setActivity(data);
  };

  useEffect(() => {
    loadActivity();
  }, [id]);

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteActivity(token, id);
      navigate("/activities");
    } catch (error) {
      setError(error.message);
    }
  };

  if (!activity) {
    return <p>Loading activity...</p>;
  }

  return (
    <>
      <h1>{activity.name}</h1>

      <p>{activity.description}</p>

      <p>Created by: {activity.creatorName}</p>

      {token && <button onClick={tryDelete}>Delete</button>}

      {error && <p role="alert">{error}</p>}
    </>
  );
}
