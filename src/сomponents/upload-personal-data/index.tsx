import React, { useCallback, useState } from "react";
import { useTranslate } from "react-polyglot";
import { Typography, Table, Checkbox } from "antd";

import DataProviderSelect from "../data-provider-select";
import PersonalDataFileUploader from "../personal-data-file-uploader";
import ReceivingRoyalty from "../receiving-royalty";
import { PersonalDataSet } from "../../servicces/personal-data-parser";

import styles from "./uploadPersonalData.module.scss";

export type TableDataRow = { [key: string]: string };

export type ColDescription = {
  title: string | object;
  dataIndex: string;
  key: string;
  checked: boolean;
};

const UploadPersonalData: React.FC = () => {
  const f = useTranslate();
  const [tableData, setTableData] = useState<TableDataRow[]>([]);
  const [colsDescription, setColsDescription] = useState<ColDescription[]>([]);

  const checkboxHandler = (index: number) => {
    colsDescription[index].checked = !colsDescription[index].checked;
    setColsDescription(colsDescription);
  };

  const onPersonalDataLoadedHandler = useCallback(
    (personalDataSet: PersonalDataSet) => {
      console.log("-personalDataSet-", personalDataSet);
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
        personalDataSet.colsDescription.map((colName, index) => ({
          title: () => (
            <Checkbox onChange={() => checkboxHandler(index)}>
              {colName}
            </Checkbox>
          ),
          dataIndex: colName,
          key: colName,
          checked: false,
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
      <Table
        className={styles.table}
        dataSource={tableData}
        columns={colsDescription}
      />
      <ReceivingRoyalty data={tableData} columns={colsDescription} />
    </div>
  );
};

export default UploadPersonalData;
