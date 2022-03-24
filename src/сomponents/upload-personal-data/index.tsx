import React, { useCallback, useState, ChangeEvent } from "react";
import { observer } from "mobx-react-lite";
import { usePersonalData, IPersonalDataModel } from "../../store";
import { useTranslate } from "react-polyglot";
import { Typography, Table, message, Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import dayjs from "../../servicces/dayjs";

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
  const personalDataStore = usePersonalData();

  const [tableDataLoader, setTableDataLoader] = useState<boolean>(false);
  const [uploadDataLoader, setUploadDataLoader] = useState<boolean>(false);
  const [tableData, setTableData] = useState<TableDataRow[]>([]);
  const [colsDescription, setColsDescription] = useState<ColDescription[]>([]);
  const [walletKey, setWalletKey] = useState<string>("");
  const [disallowedCols, setDisallowedCols] = useState<Set<string>>(new Set());

  const onDataProcessingStart = useCallback(
    (value: boolean) => setTableDataLoader(value),
    []
  );
  const uploadData = useCallback(
    (value: IPersonalDataModel[]) => personalDataStore.uploadData(value),
    [personalDataStore]
  );

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

      setTableDataLoader(false);
    },
    [titleCheckboxInputHandler]
  );

  const sendPersonalDataHandler = useCallback(() => {
    if (!tableData.length) {
      message.info("Please select the file");
      return;
    }

    setUploadDataLoader(true);

    const fetchData: IPersonalDataModel[] = tableData.map((row) => {
      const filteredRow = Object.fromEntries(
        Object.entries(row).filter(
          (rowItem) => !disallowedCols.has(rowItem[0]) && rowItem[0] !== "key"
        )
      );

      const dateFormat = (date: string): string => {
        if (!date) return "";

        const clearedDate = date.replace(/\./g, "-");
        return dayjs(clearedDate, ["DD-MM-YYYY", "D-M-YYYY"]).format(
          "YYYY-MM-DD"
        );
      };

      return {
        date: dateFormat(filteredRow.Päivämäärä),
        name: filteredRow.Tuote,
        amount: Number(filteredRow.Summa.replace(",", ".")),
        quantity: Number(filteredRow.Määrä.replace(",", ".")),
        wallet: filteredRow.Korttinumero,
        location: filteredRow.Kauppa,
      };
    });

    uploadData(fetchData)
      .then(() => {
        message.success("Success");
        setUploadDataLoader(false);
      })
      .catch((err) => {
        message.warning("Something went wrong, try again later!");
        message.warning("Error message: " + err.message);
        console.log("Error message: ", err.message);
        setUploadDataLoader(false);
      });
  }, [walletKey, tableData, disallowedCols, uploadData]);

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
        onDataProcessingStart={onDataProcessingStart}
      />
      <Table
        loading={tableDataLoader}
        className={styles.table}
        dataSource={tableData}
        columns={colsDescription}
        pagination={{ pageSize: 100 }}
      />
      <ReceivingRoyalty
        loading={uploadDataLoader}
        inputChangeHandler={walletKeyChangeHandler}
        buttonClickHandler={sendPersonalDataHandler}
      />
    </div>
  );
};

export default observer(UploadPersonalData);
