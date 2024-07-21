const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/';

export const getPlants = async () => {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) throw new Error('Network response was not ok.');
    return  response.json();
};

export const getPots = async () => {
    const response = await fetch(`${API_BASE_URL}/pots`);
    if(!response.ok) throw new Error('Network response was not ok.');
    return response.json();
}
