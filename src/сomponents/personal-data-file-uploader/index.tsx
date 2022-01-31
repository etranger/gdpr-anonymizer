import React, { useRef, useCallback, ChangeEvent } from "react";
import { useTranslate } from "react-polyglot";
import * as pdfjsLib from "pdfjs-dist";
import { Button } from "antd";

const PersonalDataFileUploader: React.FC = () => {
  pdfjsLib.GlobalWorkerOptions.workerSrc = "pdf.worker.min.js";

  console.log(pdfjsLib.GlobalWorkerOptions);

  const f = useTranslate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadFileButtonClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length < 1) {
      return;
    }

    const fileRawData = window.URL.createObjectURL(event.target.files[0]);

    pdfjsLib.getDocument(fileRawData).promise.then((doc) => {
      console.log(1111, doc);

      // doc.getPage(1).then((page) => {
      //   page.getTextContent().then((text) => {
      //     console.log(text);
      //   });
      // });
    });
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        hidden
      />
      <Button onClick={handleUploadFileButtonClick}>
        {f("uploadPersonalDataPage.uploadFileButton")}
      </Button>
    </>
  );
};

export default PersonalDataFileUploader;
