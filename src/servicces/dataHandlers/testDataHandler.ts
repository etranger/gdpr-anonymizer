import { DataHandler } from "../personal-data-parser";
import parse from "../fileParsers/pdfParser";

const splitPdfDataByRows = (pdfData: string[]) => {
  const pdfDataWithoutSpaces = pdfData.filter(
    (item: any) => item !== undefined && item !== " " && item !== ""
  );

  console.log(
    "Step 2 - delete spaces and undefined values:",
    pdfDataWithoutSpaces
  );

  let pdfDataFiltered: string[] = pdfDataWithoutSpaces;

  const pdfDataHasTableOfContent = pdfDataWithoutSpaces.find(
    (str) => str === "Ostosi tuotetasolla"
  );

  if (pdfDataHasTableOfContent) {
    const tableOfContentEndsIndex = pdfDataWithoutSpaces.findIndex(
      (str) => str === "Summa sis. ALV"
    );

    pdfDataFiltered = pdfDataWithoutSpaces.slice(
      tableOfContentEndsIndex > 0 ? tableOfContentEndsIndex + 1 : 0
    );
  }

  console.log("Step 3 - delete table of content:", pdfDataFiltered);

  const cleaningSubjects: string[] = [
    "Päivämäärä",
    "Kauppa",
    "Kuittinumero",
    "Korttinumero",
    "Tuote",
    "Määrä",
    "Summa sis. ALV",
    "K-Plussa",
    "Luottamuksellinen",
  ];
  const isPaginationNumber = (index: number, array: string[]) => {
    const isNumber = (value: string) => /^\d{1,2}$/.test(value);
    const isSlash =
      array[index] === "/" &&
      isNumber(array[index - 1]) &&
      isNumber(array[index + 1]);
    const isLeftNumber = isNumber(array[index]) && array[index + 1] === "/";
    const isRightNumber = isNumber(array[index]) && array[index - 1] === "/";
    const isFullPagination = /^\d{1,2}\/\d{1,2}$/.test(array[index]);

    return isSlash || isLeftNumber || isRightNumber || isFullPagination;
  };
  const isDataDate = (value: string) => {
    const regex = /\d{4}-\d{1,2}-\d{1,2}/;
    if (regex.test(value)) return true;
    if (value === "Tiedot ajettu:") return true;

    return false;
  };
  const isTotalText = (index: number, array: string[]) => {
    if (array[index] === "Yhteensä:") return true;
    if (array[index - 1] === "Yhteensä:") return true;
    if (array[index - 2] === "Yhteensä:") return true;

    return false;
  };
  const pdfDataPreClearingToRows = pdfDataFiltered.filter(
    (value, index, array) => {
      if (cleaningSubjects.includes(value)) return false;
      if (isDataDate(array[index])) return false;
      if (isTotalText(index, array)) return false;
      if (isPaginationNumber(index, array)) return false;

      return true;
    }
  );

  console.log("Step 4 - Pre-cleaning to rows:", pdfDataPreClearingToRows);

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

  console.log("Step 5 - format rows:");

  while (pdfDataIndex < pdfDataPreClearingToRows.length) {
    const currentPdfDataItem = pdfDataPreClearingToRows[pdfDataIndex];

    const itemIsValid = rowTemplate[currentColIndex].test(currentPdfDataItem);

    console.log(
      "Current item:",
      currentPdfDataItem,
      ", regExp:",
      rowTemplate[currentColIndex],
      ", is valid:",
      itemIsValid
    );

    currentRow.push(itemIsValid ? currentPdfDataItem : "--");

    currentColIndex++;

    if (itemIsValid) {
      pdfDataIndex++;
    }

    if (currentColIndex >= rowTemplate.length) {
      console.log("Row has formated", currentRow);
      console.log("===================================");

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

const numberingRows = (splittedPdfData: string[][]) =>
  splittedPdfData.map((value, index) => {
    value.unshift(String(index));
    return value;
  });

const testDataHandler: DataHandler = async (fileRawData) => {
  const pdfData = await parse(fileRawData);

  console.log("Step 1 - raw PDF data:", pdfData);

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
    data: numberingRows(splitPdfDataByRows(pdfData)),
  };
};

export default testDataHandler;
