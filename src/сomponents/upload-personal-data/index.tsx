import React from "react";
import { useTranslate } from "react-polyglot";
import { Typography } from "antd";

import DataProviderSelect from "../data-provider-select";
import PersonalDataFileUploader from "../personal-data-file-uploader";

const UploadPersonalData: React.FC = () => {
  const f = useTranslate();

  return (
    <div>
      <Typography.Title>{f("uploadPersonalDataPage.title")}</Typography.Title>
      <DataProviderSelect />
      <PersonalDataFileUploader />
    </div>
  );
};

export default UploadPersonalData;
