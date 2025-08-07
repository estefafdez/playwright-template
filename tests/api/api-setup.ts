// Helper function to add delay between API tests to avoid 429 rate limiting
export const addApiDelay = async (delayMs: number = 1000) => {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
};

// Default delay for API tests
export const DEFAULT_API_DELAY = 1000;

// Export delay function for easy import
export default addApiDelay;
