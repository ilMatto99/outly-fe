import React from 'react';
import { Card } from 'react-bootstrap';
import './CardActivity.css';

type CardActivityProps = {
  title: string;
  location: string;
  date: string;
  distance: string;
  duration: string;
  difficulty: string;
  mapImage: string;
};

const CardActivity: React.FC<CardActivityProps> = ({
  title,
  location,
  date,
  distance,
  duration,
  difficulty,
  mapImage,
}) => {
  return (
    <Card className="card-activity">
      <Card.Img
        variant="top"
        src={mapImage}
        alt="Mappa del percorso"
        className="card-activity-image"
      />
      <Card.Body>
        <Card.Title className="card-activity-title">{title}</Card.Title>
        <Card.Text className="card-activity-location">{location}</Card.Text>
        <Card.Text className="card-activity-date">{date}</Card.Text>
        <div className="card-activity-footer">
          <span>{difficulty}</span>
          <span>&bull;</span>
          <span>{distance}</span>
          <span>&bull;</span>
          <span>{duration}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardActivity;
