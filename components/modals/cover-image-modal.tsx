"use client";

import { useCoverImage } from "@/hooks/use-cover-image";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { SingleImageDropzone } from "../single-image-dropzone";

export default function CoverImageModal() {
  const { documentId } = useParams();
  const update = useMutation(api.documents.update);
  const  { isOpen, onClose } = useCoverImage();
  const  { edgestore } = useEdgeStore();
  
  const [file, setFile] = useState<File>();
  const [isSubmiting, setIsSubmiting] = useState(false);

  const handleOnClose = () => {
    setFile(undefined);
    setIsSubmiting(false);
    onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmiting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file
      });

      await update({
        id: documentId as Id<"documents">,
        coverImage: res?.url,
      });

      handleOnClose();
    };
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader className="border-b pb-3">
            <h2 className="text-center text-lg font-semibold">
              Cover image
            </h2>
          </DialogHeader>

          <SingleImageDropzone
            className="w-full outline-none"
            disabled={isSubmiting}
            value={file}
            onChange={onChange}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}