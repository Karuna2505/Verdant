const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const getPlants = async () => {
    const response = await fetch(`${API_BASE_URL}/plants`);
    if (!response.ok) throw new Error('Network response was not ok.');
    return await response.json();
};

export const addPlant = async (plant) => {
    const response = await fetch(`${API_BASE_URL}/plants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plant)
    });
    if (!response.ok) throw new Error('Network response was not ok.');
    return await response.json();
};

export const updatePlant = async (id, plant) => {
    const response = await fetch(`${API_BASE_URL}/plants/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plant)
    });
    if (!response.ok) throw new Error('Network response was not ok.');
    return await response.json();
};

export const deletePlant = async (id) => {
    const response = await fetch(`${API_BASE_URL}/plants/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Network response was not ok.');
};
