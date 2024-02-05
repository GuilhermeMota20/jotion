"use client";

import { useEdgeStore } from "@/lib/edgestore";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useTheme } from "next-themes";

type Props = {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

export default function Editor({ onChange, editable, initialContent }: Props) {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file
    });

    return response.url;
  };

  const editor: BlockNoteEditor | any = useBlockNote({
    editable,
    initialContent:
      initialContent
        ? JSON.parse(initialContent)
        : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,

  });

  return (
    <>
      <div>
        <BlockNoteView
          editor={editor}
          theme={resolvedTheme === "dark" ? "dark" : "light"}
        />
      </div>
    </>
  )
}