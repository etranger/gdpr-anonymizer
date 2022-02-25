import { DataHandler } from "../personal-data-parser";
import parse from "../fileParsers/pdfParser";
import { TextItem } from "pdfjs-dist/types/src/display/api";

const colNames = [
  "Päivämäärä",
  "Kauppa",
  "Kuittinumero",
  "Korttinumero",
  "Tuote",
  "Määrä",
  "Summa sis. ALV",
];

const processRawData = (pdfData: TextItem[]): TextItem[][] => {
  const result = [];
  let row = [];

  for (let item of pdfData) {
    if (!["", " "].includes(item.str)) {
      row.push(item);
    }

    if (item.hasEOL) {
      result.push(row);
      row = [];
    }
  }

  return result;
};

const findTitleRow = (pdfData: TextItem[][]): TextItem[] | undefined => {
  return pdfData.find((row) => {
    let result = true;
    for (let index in row) {
      if (colNames[index] !== row[index].str) {
        result = false;
        break;
      }
    }
    return result;
  });
};

const testRow = (row: string[]) => {
  const tests = [
    (str: string) => /^\d{1,2}.\d{1,2}.\d{4}$/.test(str),
    (str: string) => /^.+$/.test(str),
    (str: string) => /^\d+$/.test(str),
    (str: string) => /^\d+$/.test(str),
    (str: string) => /^.+$/.test(str),
    (str: string) => /^\d+,?\d{0,}$/.test(str),
    (str: string) => /^\d+,?\d{0,}$/.test(str),
  ];

  if (row.every((item) => item === "") || !tests[0](row[0])) {
    return false;
  }

  let result = true;

  for (let index in row) {
    if (row[index] !== "" && !tests[index](row[index])) {
      result = false;
      break;
    }
  }

  return result;
};

const format = (pdfData: TextItem[][], titleRow: TextItem[]): string[][] => {
  return pdfData.reduce((acc: any, row) => {
    const formatedRow: string[][] = [[""], [""], [""], [""], [""], [""], [""]];
    let currentColIndex = 0;
    let currentItemIndex = 0;

    while (currentColIndex <= 6 && currentItemIndex <= row.length - 1) {
      const item = row[currentItemIndex];
      if (
        item.transform[4] >= titleRow[currentColIndex].transform[4] &&
        (currentColIndex < titleRow.length - 1
          ? item.transform[4] < titleRow[currentColIndex + 1].transform[4]
          : true)
      ) {
        formatedRow[currentColIndex].push(item.str);
        currentItemIndex++;
      } else {
        currentColIndex++;
      }
    }

    const resultRow = formatedRow.map((item) => item.join(""));
    if (testRow(resultRow)) {
      acc.push(resultRow);
    }

    return acc;
  }, []);
};

const testDataHandler: DataHandler = async (fileRawData) => {
  const pdfData = await parse(fileRawData);

  if (!pdfData) {
    throw new Error("Invalid file data");
  }

  const processedRawData = processRawData(pdfData as TextItem[]);

  const titleRow = findTitleRow(processedRawData);

  if (!titleRow) {
    throw new Error("The title row has not been found.");
  }

  const formatedData = format(processedRawData, titleRow);

  console.log(formatedData);

  return {
    colsDescription: [
      "№",
      "Päivämäärä",
      "Kauppa",
      "Kuittinumero",
      "Korttinumero",
      "Tuote",
      "Määrä",
      "Summa",
    ],
    data: formatedData.map((row, index) => {
      row.unshift(String(index + 1));
      return row;
    }),
  };
};

export default testDataHandler;
