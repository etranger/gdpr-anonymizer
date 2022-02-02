import React, { useCallback, useState, ChangeEvent } from "react";
import { useTranslate } from "react-polyglot";
import { Typography, Table, message } from "antd";

import DataProviderSelect from "../data-provider-select";
import PersonalDataFileUploader from "../personal-data-file-uploader";
import ReceivingRoyalty from "../receiving-royalty";
import TableHeadCheckbox from "../table-head-checkbox";
import { PersonalDataSet } from "../../servicces/personal-data-parser";

import styles from "./uploadPersonalData.module.scss";

export type TableDataRow = { [key: string]: string };

export type ColDescription = {
  title: () => void;
  dataIndex: string;
  key: string;
  isPossibleToUse: boolean;
};

const UploadPersonalData: React.FC = () => {
  const f = useTranslate();
  const [tableData, setTableData] = useState<TableDataRow[]>([]);
  const [colsDescription, setColsDescription] = useState<ColDescription[]>([]);
  const [walletKey, setWalletKey] = useState<string>("");

  // const colCheckboxHandler = useCallback(
  //   (index: number) => {
  //     if (!colsDescription[index]) {
  //       return;
  //     }

  //     colsDescription[index].isPossibleToUse =
  //       !colsDescription[index].isPossibleToUse;
  //     setColsDescription(colsDescription);
  //   },
  //   [colsDescription]
  // );

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

      const colCheckboxHandler = (index: number) => {
        if (!colsDescription[index]) {
          return;
        }

        colsDescription[index].isPossibleToUse =
          !colsDescription[index].isPossibleToUse;
        setColsDescription(colsDescription);
      };
      const colsDescription: ColDescription[] =
        personalDataSet.colsDescription.map((colName, index) => ({
          title: () => (
            <TableHeadCheckbox
              colName={colName}
              checkboxHandler={() => colCheckboxHandler(index)}
            />
          ),
          dataIndex: colName,
          key: colName,
          isPossibleToUse: false,
        }));
      setColsDescription(colsDescription);
    },
    []
  );

  const sendPersonalDataHandler = useCallback(() => {
    if (walletKey === "") {
      message.warning("Wrong Lightning wallet");
      return;
    }

    const fetchData: TableDataRow[] = tableData.map((row) => {
      let result: TableDataRow = {};
      colsDescription.forEach((col) => {
        if (!row[col.key] || col.isPossibleToUse) {
          return;
        }

        result[col.key] = row[col.key];
      });

      return result;
    });

    console.log("-send-", fetchData);
  }, [walletKey, tableData, colsDescription]);

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
      />
      <ReceivingRoyalty
        inputChangeHandler={walletKeyChangeHandler}
        buttonClickHandler={sendPersonalDataHandler}
      />
    </div>
  );
};

export default UploadPersonalData;
