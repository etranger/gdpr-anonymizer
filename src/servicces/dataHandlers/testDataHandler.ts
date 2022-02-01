import { DataHandler } from "../personal-data-parser";
import parse from "../fileParsers/pdfParser";
import { TextItem, TextMarkedContent } from "pdfjs-dist/types/src/display/api";

const splitPdfDataByRows = (pdfData: (TextItem | TextMarkedContent)[]) => {
  const pdfDataFiltered: any[] = pdfData.filter(
    (item: any) => item.str !== undefined && item.str !== " "
  );

  const rowTemplate = [
    /^\d{1,2}.\d{1,2}.\d{4}$/,
    /^.+$/,
    /^\d+$/,
    /^\d+$/,
    /^.+$/,
    /^\d+,?\d{0,}$/,
    /^\d+,?\d{0,}$/,
  ];

  const result = [];
  let currentRow = [];
  let currentColIndex = 0;
  let pdfDataIndex = 0;

  while (pdfDataIndex < pdfDataFiltered.length) {
    const currentPdfDataItem = pdfDataFiltered[pdfDataIndex];
    const itemIsValid = rowTemplate[currentColIndex].test(
      currentPdfDataItem.str
    );

    currentRow.push(itemIsValid ? (currentPdfDataItem.str as string) : "--");

    currentColIndex++;

    if (itemIsValid) {
      pdfDataIndex++;
    }

    if (currentColIndex >= rowTemplate.length) {
      result.push(currentRow);
      currentColIndex = 0;
      currentRow = [];

      if (!itemIsValid) {
        //todo need to correct terminate condition and rows validation
        console.log(
          `An invalid row. ${result.length} rows have been processed`
        );
        break;
      }
    }
  }

  return result;
};

const testDataHandler: DataHandler = async (fileRawData) => {
  const pdfData = await parse(fileRawData);
  if (!pdfData) {
    throw new Error("Invalid file data");
  }

  return {
    colsDescription: [
      "Päivämäärä",
      "Kauppa",
      "Kuittinumero",
      "Korttinumero",
      "Tuote",
      "Määrä",
      "Summa",
    ],
    data: splitPdfDataByRows(pdfData),
  };
};

export default testDataHandler;
