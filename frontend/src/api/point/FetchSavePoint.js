import { call } from '../auth/ApiService';

export async function savePoint(PointData) {
  try {
    const response = await call(
      `/point/saveReviewPoint`,
      'POST',
      JSON.stringify(PointData)
    );
    console.log(response);

    if (!response.ok) {
      // throw new Error('Failed to save point');
    }
  } catch (error) {
    console.error('Error saving point:', error);
  }
}
