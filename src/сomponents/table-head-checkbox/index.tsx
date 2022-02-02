import React from "react";
import { Checkbox } from "antd";

type Props = {
  colName: string;
  checkboxHandler: () => void;
};

const ReceivingRoyalty: React.FC<Props> = ({ colName, checkboxHandler }) => {
  return (
    <>
      <Checkbox onChange={checkboxHandler}>{colName}</Checkbox>
    </>
  );
};

export default ReceivingRoyalty;
