import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
//import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);


const EditerView = ({ description }) => {
  const [contentstate, setContentstate] = useState<any>(null);



  useEffect(() => {
    if (description) {
      const parse = JSON.parse(description);
      setContentstate(parse);
    }
  }, []);

  useEffect(() => {
  }, [description]);
  return (
    <div>
      <Editor
        initialContentState={contentstate}
        wrapperClassName="document-wrapper"
        editorClassName="document-editor"
        toolbarClassName="document-toolbar"
        readOnly
        toolbarHidden
      />
    </div>
  );
};

export default EditerView;
