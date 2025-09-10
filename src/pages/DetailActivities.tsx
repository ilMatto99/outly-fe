import React from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import type { AttivitaDTO } from "@/types/AttivitaDTO";
import { Button, Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
import { OrganizerCard } from "@/components/OrganizerCard/OrganizerCard";
import { useUserById } from "@/hooks/useUserById";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const DetailActivities: React.FC = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const activity = state?.activity as AttivitaDTO | undefined;

  const { user, loading, error } = useUserById(activity?.idCreatore);

  if (!activity) {
    return (
      <Container className="py-4">
        <h2>Attività non trovata</h2>
        <p>ID cercato: {id}</p>
        <Button variant="primary" onClick={() => navigate("/home")}>
          Torna alla home
        </Button>
      </Container>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar variant="primary" />
      </div>
      <div className="d-flex flex-column vh-100" style={{marginTop: "100px"}}>

        {/* Immagine mappa */}
        {activity.mappaUrl && (
          <Image
            src={activity.mappaUrl}
            alt="Mappa percorso"
            className="w-100"
            style={{ objectFit: "cover", maxHeight: "250px" }}
          />
        )}

        <div className="flex-grow-1 overflow-auto bg-white rounded-top p-3">
          <Container>
            {/* Titolo */}
            <h5 className="fw-bold">{activity.titolo}</h5>
            <p className="text-muted mb-4">{activity.luogo}</p>

            {/* Info rapide */}
            <Row className="text-center mb-4">
              <Col>
                <i className="bi bi-bicycle fs-4"></i>
                <p className="mb-0">{activity.sport}</p>
              </Col>
              <Col>
                <i className="bi bi-signpost-split fs-4"></i>
                <p className="mb-0">{activity.km} km</p>
              </Col>
              <Col>
                <i className="bi bi-clock fs-4"></i>
                <p className="mb-0">{activity.durata} min</p>
              </Col>
            </Row>

            <h6 className="fw-bold">Informazioni aggiuntive</h6>
            <p className="mb-1">
              <strong>Data:</strong>{" "}
              {new Date(activity.dataAttivita).toLocaleDateString()}
            </p>
            <p>{activity.descrizione}</p>

            <p className="fw-bold mb-1">
              Punto di ritrovo: <span className="fw-normal">{activity.luogo}</span>
            </p>

            {/* OrganizerCard */}
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {!loading && !user && !error && (
              <Alert variant="warning">Utente non trovato</Alert>
            )}
            {user && (
              <OrganizerCard
                nome={user.nome}
                cognome={user.cognome}
                onContact={() => console.log("Contatta organizzatore")}
              />
            )}

            <Button variant="dark" className="w-100 mb-3">
              Iscriviti
            </Button>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
};
