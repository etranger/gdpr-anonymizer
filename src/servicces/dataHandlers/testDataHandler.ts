import { DataHandler } from "../personal-data-parser";
import parse from "../fileParsers/pdfParser";
import { TextItem, TextMarkedContent } from "pdfjs-dist/types/src/display/api";

const process = (pdfData: TextItem[]) => {
  const result = [];
  let row = [];

  for (let item of pdfData) {
    if (!item.hasEOL) {
      row.push(item);
    } else {
      result.push(row);
      row = [];
    }
  }

  console.log(result);
};

const testDataHandler: DataHandler = async (fileRawData) => {
  const pdfData = await parse(fileRawData);
  process(pdfData as TextItem[]);
  // console.log("Step 1 - raw PDF data:", pdfData);

  if (!pdfData) {
    throw new Error("Invalid file data");
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
