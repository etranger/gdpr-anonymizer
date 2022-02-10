import React, { useCallback, useState, ChangeEvent } from "react";
import { useTranslate } from "react-polyglot";
import { Typography, Table, message, Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

import DataProviderSelect from "../data-provider-select";
import PersonalDataFileUploader from "../personal-data-file-uploader";
import ReceivingRoyalty from "../receiving-royalty";
import { PersonalDataSet } from "../../servicces/personal-data-parser";

import styles from "./uploadPersonalData.module.scss";

export type TableDataRow = { [key: string]: string };

export type ColDescription = {
  title: JSX.Element;
  dataIndex: string;
  key: string;
};

const UploadPersonalData: React.FC = () => {
  const f = useTranslate();
  const [tableData, setTableData] = useState<TableDataRow[]>([]);
  const [colsDescription, setColsDescription] = useState<ColDescription[]>([]);
  const [walletKey, setWalletKey] = useState<string>("");
  const [disallowedCols, setDisallowedCols] = useState<Set<string>>(new Set());

  const titleCheckboxInputHandler = useCallback(
    (colName: string) => (event: CheckboxChangeEvent) => {
      if (!event.target.checked) {
        disallowedCols.add(colName);
      } else {
        disallowedCols.delete(colName);
      }

      setDisallowedCols(disallowedCols);
    },
    [disallowedCols]
  );

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
          title: (
            <Checkbox
              defaultChecked
              onChange={titleCheckboxInputHandler(colName)}
            >
              {colName}
            </Checkbox>
          ),
          dataIndex: colName,
          key: colName,
        }));
      setColsDescription(colsDescription);
    },
    [titleCheckboxInputHandler]
  );

  const sendPersonalDataHandler = useCallback(() => {
    if (walletKey === "") {
      message.warning("Wrong Lightning wallet");
      return;
    }

    const fetchData = tableData.map((row) =>
      Object.entries(row).filter(
        (rowItem) => !disallowedCols.has(rowItem[0]) && rowItem[0] !== "key"
      )
    );

    console.log("-send-", fetchData);
  }, [walletKey, tableData, disallowedCols]);

  const walletKeyChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setWalletKey(event.target.value),
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
        pagination={{ pageSize: 100 }}
      />
      <ReceivingRoyalty
        inputChangeHandler={walletKeyChangeHandler}
        buttonClickHandler={sendPersonalDataHandler}
      />
    </div>
  );
};

export default UploadPersonalData;
