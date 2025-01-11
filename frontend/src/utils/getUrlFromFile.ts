export const createBlobUrl = async (
  filePath: string,
): Promise<string | undefined> => {
  try {
    const response = await fetch(`http://localhost:8080/${filePath}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch video. Status: ${response.status}`);
    }

    const blob = await response.blob();

    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.error('Error fetching and creating URL:', error);
  }
};
