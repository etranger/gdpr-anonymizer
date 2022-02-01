import { DataHandler } from "../personal-data-parser";
import parse from "../fileParsers/pdfParser";
import { TextItem, TextMarkedContent } from "pdfjs-dist/types/src/display/api";

const splitPdfDataByRows = (
  pdfData: (TextItem | TextMarkedContent)[],
  rowSize = 11
) => {
  const iter = (
    acc: (TextItem | TextMarkedContent)[][],
    from: number
  ): (TextItem | TextMarkedContent)[][] => {
    if (from > pdfData.length - rowSize) {
      return acc;
    }
    const to = from + rowSize;
    return iter([...acc, pdfData.slice(from, to)], to);
  };

  return iter([], 0);
};

const formatData = (
  pdfDataRows: (TextItem | TextMarkedContent)[][]
): string[][] => {
  return pdfDataRows.map((row) =>
    row
      .filter((col: any) => col.str !== undefined && col.str !== " ")
      .map((col: any) => col.str)
  );
};

const testDataHandler: DataHandler = async (fileRawData) => {
  const pdfData = await parse(fileRawData);
  if (!pdfData) {
    throw new Error("Invalid file data");
  }

  return {
    colsDescription: [""],
    data: formatData(splitPdfDataByRows(pdfData)),
  };
};

export default testDataHandler;
