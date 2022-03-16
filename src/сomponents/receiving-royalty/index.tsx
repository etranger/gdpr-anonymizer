import React, { ChangeEvent } from "react";
import { useTranslate } from "react-polyglot";
import { Input, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import styles from "./receivingRoyalty.module.scss";

const antIcon = <LoadingOutlined style={{ fontSize: 18 }} spin />;

type Props = {
  loading: boolean;
  inputChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  buttonClickHandler: () => void;
};

const ReceivingRoyalty: React.FC<Props> = ({
  loading,
  inputChangeHandler,
  buttonClickHandler,
}) => {
  const f = useTranslate();

  return (
    <div className={styles.wrapper}>
      <Input
        className={styles.walletInput}
        type="text"
        onChange={inputChangeHandler}
        placeholder={f("uploadPersonalDataPage.receivingRoyaltyInput")}
      />
      <Button onClick={buttonClickHandler} disabled={loading}>
        {loading && <Spin indicator={antIcon} />}
        {loading
          ? f("loading")
          : f("uploadPersonalDataPage.receivingRoyaltyButton")}
      </Button>
    </div>
  );
};

export default ReceivingRoyalty;
