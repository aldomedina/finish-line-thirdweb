const getAspectRatioFromImageUrl = async (url: string) => {
  const img = new Image();
  img.src = url;
  await img.decode();
  return img.width / img.height;
};
export default getAspectRatioFromImageUrl;
