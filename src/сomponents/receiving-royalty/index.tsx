import React, { useState, ChangeEvent, useCallback } from "react";
import { useTranslate } from "react-polyglot";
import { Input, Button } from "antd";
import { TableDataRow, ColDescription } from "../upload-personal-data";

import styles from "./receivingRoyalty.module.scss";

type Props = {
  data: TableDataRow[];
  columns: ColDescription[];
};

const ReceivingRoyalty: React.FC<Props> = ({ data, columns }) => {
  const f = useTranslate();
  const [wallet, setWallet] = useState<string>("");

  const handleUploadFileButtonClick = useCallback(() => {
    if (wallet === "") {
      alert("Wrong Lightning wallet");
      return;
    }

    const result: any = [];
    data.forEach((value: any) => {
      let clone: any = JSON.parse(JSON.stringify(value));
      columns.forEach((col: any) => {
        if (col.key !== clone[col.key] && !col.checked) return;
        delete clone[col.key];
      });

      result.push(clone);
    });

    console.log("-uploaded file-", result);
  }, [wallet, data, columns]);

  const handleWalletInputChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => setWallet(event.target.value);

  return (
    <div className={styles.wrapper}>
      <Input
        className={styles.walletInput}
        type="text"
        onChange={handleWalletInputChange}
        placeholder={f("uploadPersonalDataPage.receivingRoyaltyInput")}
      />
      <Button onClick={handleUploadFileButtonClick}>
        {f("uploadPersonalDataPage.receivingRoyaltyButton")}
      </Button>
    </div>
  );
};

export default ReceivingRoyalty;
