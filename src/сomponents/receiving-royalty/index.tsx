import React, { ChangeEvent } from "react";
import { useTranslate } from "react-polyglot";
import { Input, Button } from "antd";

import styles from "./receivingRoyalty.module.scss";

type Props = {
  inputChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  buttonClickHandler: () => void;
};

const ReceivingRoyalty: React.FC<Props> = ({
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
      <Button onClick={buttonClickHandler}>
        {f("uploadPersonalDataPage.receivingRoyaltyButton")}
      </Button>
    </div>
  );
};

export default ReceivingRoyalty;
