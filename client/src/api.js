const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? 'http://localhost:5000' // Local backend
    : process.env.REACT_APP_API_BASE_URL; // Deployed backend

export const getPlants = async () => {
    const response = await fetch(`${API_BASE_URL}/api/plants`);
    if (!response.ok) throw new Error('Network response was not ok.');
    return  response.json();
};

export const getPots = async () => {
    const response = await fetch(`${API_BASE_URL}/api/pots`);
    if(!response.ok) throw new Error('Network response was not ok.');
    return response.json();
}
