import React, { useCallback, useState } from "react";
import { useTranslate } from "react-polyglot";
import { Typography, Table } from "antd";

import DataProviderSelect from "../data-provider-select";
import PersonalDataFileUploader from "../personal-data-file-uploader";
import { PersonalDataSet } from "../../servicces/personal-data-parser";

type TableDataRow = { [key: string]: string };

type ColDescription = {
  title: string;
  dataIndex: string;
  key: string;
};

const UploadPersonalData: React.FC = () => {
  const f = useTranslate();
  const [tableData, setTableData] = useState<TableDataRow[]>([]);
  const [colsDescription, setColsDescription] = useState<ColDescription[]>([]);

  const onPersonalDataLoadedHandler = useCallback(
    (personalDataSet: PersonalDataSet) => {
      const tableData = personalDataSet.data.map((row, rowIndex) => {
        return row.reduce(
          (acc: { [key: string]: string }, item, colIndex) => {
            const colName = personalDataSet.colsDescription[colIndex];
            acc[colName] = item;
            return acc;
          },
          { key: String(rowIndex) }
        );
      });
      setTableData(tableData);

      const colsDescription: ColDescription[] =
        personalDataSet.colsDescription.map((colName) => ({
          title: colName,
          dataIndex: colName,
          key: colName,
        }));

      setColsDescription(colsDescription);
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
      <Table dataSource={tableData} columns={colsDescription} />;
    </div>
  );
};

export default UploadPersonalData;
