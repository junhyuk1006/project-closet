export const savePoint = async (PointData) => {
  try {
    const response = await fetch(
      `http://localhost:8090/api/point/saveReviewPoint`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(PointData),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to save point');
    }
    const result = await response.text();
  } catch (error) {
    console.error('Error saving point:', error);
  }
};
