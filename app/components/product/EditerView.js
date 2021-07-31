import React from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const EditerView = ({ content }) => {
  return (
      <Editor
        initialContentState={content}
        wrapperClassName="document-wrapper"
        editorClassName="document-editor"
        toolbarClassName="document-toolbar"
        readOnly
        toolbarHidden
      />
  );
};

export default EditerView;
