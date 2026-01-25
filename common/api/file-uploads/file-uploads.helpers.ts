export async function uploadFileToS3(signedUrl: string, file: File) {
  const response = await fetch(signedUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to upload file");
  }
  return true;
}
