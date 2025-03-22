export async function appendFiles(
  formData: FormData,
  key: string,
  images: string[],
) {
  // Transform images into File objects and append them to FormData
  for (const image of images) {
    if (!image) continue;

    // Fetch the actual Blob data from the image URL
    const response = await fetch(image); // Assuming `image.name` is a valid Blob URL
    const blob = await response.blob();

    // Create a File instance from the Blob
    const file = new File([blob], `image-${Date.now()}.${blob.type}`, {
      type: blob.type,
    });
    // Append the file to FormData
    formData.append(key, file);
  }
}
