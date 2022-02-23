import * as pdfjsLib from "pdfjs-dist";
import {
  PDFPageProxy,
  TextContent,
  TextItem,
  TextMarkedContent,
} from "pdfjs-dist/types/src/display/api";
pdfjsLib.GlobalWorkerOptions.workerSrc = "pdf.worker.min.js";

const parse = async (
  fileRawData: string
): Promise<void | (TextItem | TextMarkedContent)[]> => {
  const doc = await pdfjsLib.getDocument(fileRawData).promise;
  let result: (TextItem | TextMarkedContent)[] = [];

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page: PDFPageProxy = await doc.getPage(pageNum);
    const textContent: TextContent = await page.getTextContent();
    result = [...result, ...textContent.items];
  }

  return result;
};

export default parse;
