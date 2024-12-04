// Function to get the correct image path
export const getImagePath = (imageName: string): string => {
  // In development, use the public path
  if (process.env.NODE_ENV === 'development') {
    return `/images/${imageName}`;
  }
  
  // In production (Vercel), use the full URL
  return `${process.env.REACT_APP_BASE_URL || ''}/images/${imageName}`;
}
