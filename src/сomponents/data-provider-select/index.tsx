import React from "react";
import { useTranslate } from "react-polyglot";
import { Select } from "antd";

import styles from "./dataProviderSelect.module.scss";

const DataProviderSelect: React.FC = () => {
  const f = useTranslate();

  return (
    <Select defaultValue="default" className={styles.select}>
      <Select.Option value="default" disabled>
        {f("uploadPersonalDataPage.dataProviderSelectDefault")}
      </Select.Option>
    </Select>
  );
};

export default DataProviderSelect;
