import React, { useRef, useCallback, ChangeEvent } from "react";
import { useTranslate } from "react-polyglot";
import { Button } from "antd";

import pdp, {
  DataProviders,
  PersonalDataSet,
} from "../../servicces/personal-data-parser";

type Props = {
  onPersonalDataLoaded: (personalDataSet: PersonalDataSet) => void;
};

const PersonalDataFileUploader: React.FC<Props> = ({
  onPersonalDataLoaded,
}) => {
  const f = useTranslate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadFileButtonClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileInputChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length < 1) {
      return;
    }

    const fileRawData = window.URL.createObjectURL(event.target.files[0]);
    try {
      const personalDataSet = await pdp.process(
        fileRawData,
        DataProviders.test
      );
      onPersonalDataLoaded(personalDataSet);
    } catch (error) {
      console.error(error);
    }
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
