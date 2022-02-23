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

const format = (pdfData: TextItem[][], titleRow: TextItem[]) => {
  return pdfData.reduce((acc: any, row) => {
    const formatedRow: TextItem[][] = [[], [], [], [], [], [], []];
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
        formatedRow[currentColIndex].push(item);
        currentItemIndex++;
      } else {
        currentColIndex++;
      }
    }

    acc.push(formatedRow);
    return acc;
  }, []);
};

const testDataHandler: DataHandler = async (fileRawData) => {
  const pdfData = await parse(fileRawData);

  if (!pdfData) {
    throw new Error("Invalid file data");
  }

  const processedRawData = processRawData(pdfData as TextItem[]);

  console.log(processedRawData);

  const titleRow = findTitleRow(processedRawData);

  if (titleRow) {
    const result = format(processedRawData, titleRow);
    console.log(result);
  }

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
    data: [],
    // pdfData.filter(
    //   (item: any) => item !== undefined && item !== " " && item !== ""
    // )
  };
};

export default testDataHandler;
