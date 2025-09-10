import React from "react";
import { Link } from "react-router";
import CardActivity from "../CardActivity/CardActivity";
import { useAllActivities } from "@/hooks/useAllActivities";
import type { AttivitaDTO } from "@/types/AttivitaDTO";

export const ActivitiesList: React.FC = () => {
  const { activities, loading, error } = useAllActivities();

  if (loading) return <div>Caricamento attività...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (activities.length === 0) return <div>Nessuna attività trovata</div>;

  return (
    <div
      className="activities-list"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "30px",
      }}
    >
      {activities.map((att: AttivitaDTO) => (
        <Link
          key={att.id}
          to={`/attivita/${att.id}`}
          state={{ activity: att }}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <CardActivity
            title={att.titolo}
            location={att.luogo}
            date={new Date(att.dataAttivita).toLocaleDateString()}
            distance={`${att.km} km`}
            duration={`${att.durata} min`}
            difficulty={String(att.difficolta)}
            mapImage={att.mappaUrl}
          />
        </Link>
      ))}
    </div>
  );
};

export default ActivitiesList;
