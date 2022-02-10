import React, { useCallback, useState } from "react";
import { useTranslate } from "react-polyglot";
import { Select } from "antd";
import type { BaseOptionType } from "rc-select/lib/Select";

import styles from "./dataProviderSelect.module.scss";

const DataProviderSelect: React.FC = () => {
  const f = useTranslate();
  const [options, setOptions] = useState<BaseOptionType[]>([
    {
      title: "uploadPersonalDataPage.dataProviderSelectDefault",
      value: "default",
      disabled: true,
    },
    {
      title: "uploadPersonalDataPage.dataProviderSelectKPlussa",
      value: "K-Plussa",
    },
  ]);
  const [selected, setSelected] = useState<BaseOptionType>(options[1]);

  const handleChange = useCallback(
    (value: BaseOptionType) => setSelected(value),
    []
  );

  return (
    <Select
      defaultValue={selected}
      className={styles.select}
      onChange={handleChange}
    >
      {options.map(({ value, title, disabled }, index) => (
        <Select.Option value={value} key={index} disabled={disabled}>
          {f(title)}
        </Select.Option>
      ))}
    </Select>
  );
};

export default DataProviderSelect;
