import type { TGetPresignedUrlInput } from "~/common/api/file-uploads/file-uploads.mutations";
import type { Step1Emits } from "./Step1ImageUpload.types";

export async function handleFileUpdate(
  file: File | null,
  selectedFile: Ref<File | { id: number; image_url?: string } | null>,
  emit: Step1Emits,
  getPresignedUrl: (
    input: TGetPresignedUrlInput,
  ) => Promise<{ signedUrl: string }>,
  uploadFile: (input: { url: string; file: File }) => Promise<void>,
) {
  if (!file) {
    selectedFile.value = null;
    emit("update", "");
    return;
  }

  selectedFile.value = file;

  if (!(file instanceof File)) return;

  try {
    const response = await getPresignedUrl({
      fileName: file.name,
      fileType: file.type as TGetPresignedUrlInput["fileType"],
      fileSize: file.size,
    });

    if (!response?.signedUrl) throw new Error("Failed to get upload URL");
    const { signedUrl } = response;

    await uploadFile({ url: signedUrl, file });

    const publicUrl = signedUrl.split("?")[0];

    if (publicUrl) {
      emit("update", publicUrl);
    }
  } catch (error) {
    console.error(error);
    selectedFile.value = null;
  }
}
