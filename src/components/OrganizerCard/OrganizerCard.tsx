import React from "react";
import { Card, Button } from "react-bootstrap";

interface OrganizerCardProps {
  nome: string;
  cognome: string;
  onContact?: () => void;
}

export const OrganizerCard: React.FC<OrganizerCardProps> = ({
  nome,
  cognome,
  onContact,
}) => {
  return (
    <Card className="mb-3">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <small className="text-muted">Organizzatore:</small>
          <p className="mb-0 fw-bold">{nome} {cognome}</p>
        </div>
        <Button variant="outline-primary" size="sm" onClick={onContact}>
          Contatta
        </Button>
      </Card.Body>
    </Card>
  );
};
