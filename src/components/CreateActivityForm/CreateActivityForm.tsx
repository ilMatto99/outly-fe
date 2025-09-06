import { useState } from "react";
import { useCreateActivities } from "@/hooks/useCreateActivities";
import { useAuth } from "@/hooks/useAuth";
import type { AttivitaDTO } from "@/types/AttivitaDTO";

import { Form, Button, Alert, Spinner, Row, Col } from "react-bootstrap";
import "./CreateActivityForm.css"; // Se vuoi aggiungere stili personalizzati

type FormState = Omit<AttivitaDTO, "id" | "idCreatore">;

export default function CreateActivityForm() {
  const { userId, loadingAuth } = useAuth();
  const { createActivity, loading, error, success } = useCreateActivities();

  const [form, setForm] = useState<FormState>({
    titolo: "",
    descrizione: "",
    sport: 0,
    difficolta: 0,
    luogo: "",
    puntoRitrovo: "",
    km: 0,
    durata: 0,
    elevazione: 0,
    mappaUrl: "",
    dataAttivita: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const parsedValue = type === "number" ? (value === "" ? 0 : Number(value)) : value;
    setForm((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createActivity(form);
      setForm({
        titolo: "",
        descrizione: "",
        sport: 0,
        difficolta: 0,
        luogo: "",
        puntoRitrovo: "",
        km: 0,
        durata: 0,
        elevazione: 0,
        mappaUrl: "",
        dataAttivita: "",
      });
    } catch (err) {
      console.error("Errore creazione attività:", err);
    }
  };

  if (loadingAuth) return <Spinner animation="border" />;

  if (!userId) return <Alert variant="warning">Effettua il login per creare un'attività.</Alert>;

  return (
    <Form onSubmit={handleSubmit} className="create-activity-form p-3">
      <Form.Group className="mb-3">
        <Form.Label>Titolo</Form.Label>
        <Form.Control name="titolo" value={form.titolo} onChange={handleChange} placeholder="Titolo attività" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Descrizione</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="descrizione"
          value={form.descrizione}
          onChange={handleChange}
          placeholder="Descrizione attività"
        />
      </Form.Group>

      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Sport ID</Form.Label>
            <Form.Control type="number" name="sport" value={form.sport} onChange={handleChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Difficoltà</Form.Label>
            <Form.Control type="number" name="difficolta" value={form.difficolta} onChange={handleChange} />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Luogo</Form.Label>
        <Form.Control name="luogo" value={form.luogo} onChange={handleChange} placeholder="Luogo" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Punto di ritrovo</Form.Label>
        <Form.Control name="puntoRitrovo" value={form.puntoRitrovo} onChange={handleChange} placeholder="Punto di ritrovo" />
      </Form.Group>

      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Km</Form.Label>
            <Form.Control type="number" name="km" value={form.km} onChange={handleChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Durata (min)</Form.Label>
            <Form.Control type="number" name="durata" value={form.durata} onChange={handleChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Elevazione (m)</Form.Label>
            <Form.Control type="number" name="elevazione" value={form.elevazione} onChange={handleChange} />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>URL Mappa</Form.Label>
        <Form.Control name="mappaUrl" value={form.mappaUrl} onChange={handleChange} placeholder="URL mappa" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Data attività</Form.Label>
        <Form.Control type="date" name="dataAttivita" value={form.dataAttivita} onChange={handleChange} />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? <Spinner as="span" animation="border" size="sm" /> : "Crea Attività"}
      </Button>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {success && <Alert variant="success" className="mt-3">Attività creata con successo!</Alert>}
    </Form>
  );
}
