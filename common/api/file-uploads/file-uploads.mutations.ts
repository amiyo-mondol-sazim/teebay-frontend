import { useMutation } from "@tanstack/vue-query";
import { toast } from "vue-sonner";
import { client } from "../client";
import { uploadFileToS3 } from "./file-uploads.helpers";

export type TGetPresignedUrlInput = {
  fileName: string;
  fileType:
    | "application/pdf"
    | "image/png"
    | "image/jpg"
    | "image/jpeg"
    | "image/webp";
  fileSize: number;
};

const getPresignedUrl = async (input: TGetPresignedUrlInput) => {
  const { data, error } = await client.POST("/api/v1/file-uploads", {
    body: {
      files: [
        {
          name: input.fileName,
          type: input.fileType,
          maxSize: input.fileSize,
        },
      ],
    },
  });

  if (error || !data) {
    throw new Error(error?.message || "Failed to get upload URL");
  }

  if (!data[0]) {
    throw new Error("No upload URL returned");
  }

  return data[0];
};

export const useGetPresignedUrlMutation = () => {
  return useMutation({
    mutationFn: getPresignedUrl,
    onError: (error) => {
      toast.error(error?.message || "Failed to initialize upload");
    },
  });
};

export const useUploadFileMutation = () => {
  return useMutation({
    mutationFn: async ({ url, file }: { url: string; file: File }) => {
      await uploadFileToS3(url, file);
    },
    onError: (_error) => {
      toast.error("Failed to upload file to storage");
    },
  });
};
