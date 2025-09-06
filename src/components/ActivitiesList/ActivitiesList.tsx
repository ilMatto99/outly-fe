import React from "react";
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
      style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: "center", paddingTop: "200px" }}
    >
      {activities.map((att: AttivitaDTO) => (
        <CardActivity
          key={att.id}
          title={att.titolo}
          location={att.luogo}
          date={new Date(att.dataAttivita).toLocaleDateString()}
          distance={`${att.km} km`}
          duration={`${att.durata} min`}
          difficulty={String(att.difficolta)}
          mapImage={att.mappaUrl}
        />
      ))}
    </div>
  );
};

export default ActivitiesList;
