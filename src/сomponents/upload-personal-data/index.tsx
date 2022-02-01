import React, { useCallback } from "react";
import { useTranslate } from "react-polyglot";
import { Typography, Table } from "antd";

import DataProviderSelect from "../data-provider-select";
import PersonalDataFileUploader from "../personal-data-file-uploader";
import { PersonalDataSet } from "../../servicces/personal-data-parser";

const UploadPersonalData: React.FC = () => {
  const f = useTranslate();

  const onPersonalDataLoadedHandler = useCallback(
    (personalDataSet: PersonalDataSet) => {
      const tableData = personalDataSet.data.map((row) => {
        return row.reduce((acc: { [key: string]: string }, item, index) => {
          const colName = personalDataSet.colsDescription[index];
          acc[colName] = item;
          return acc;
        }, {});
      });

      console.log(tableData);
    },
    []
  );

  return (
    <div>
      <Typography.Title>{f("uploadPersonalDataPage.title")}</Typography.Title>
      <DataProviderSelect />
      <PersonalDataFileUploader
        onPersonalDataLoaded={onPersonalDataLoadedHandler}
      />
    </div>
  );
};

export default UploadPersonalData;
