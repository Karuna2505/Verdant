import React from 'react';
import { useParams } from 'react-router-dom';

const PlantDetail = ({ plants }) => {
  const { id } = useParams();
  const plant = plants.find(plant => plant.id === id);

  if (!plant) {
    return <p>Plant not found</p>;
  }

  return (
    <div className="plant-detail">
      <img src={plant.image_url} alt={plant.name} className="plant-detail-image" />
      <div className="plant-detail-content">
        <h1 className="plant-detail-name">{plant.name}</h1>
        <p className="plant-detail-description">{plant.description}</p>
        <p className="plant-detail-price">Price: ${plant.price}</p>
        <p className="plant-detail-category">Category: {plant.category}</p>
      </div>
    </div>
  );
};

export default PlantDetail;
