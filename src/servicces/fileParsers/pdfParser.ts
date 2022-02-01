import * as pdfjsLib from "pdfjs-dist";
import { TextItem, TextMarkedContent } from "pdfjs-dist/types/src/display/api";
pdfjsLib.GlobalWorkerOptions.workerSrc = "pdf.worker.min.js";

const parse = async (
  fileRawData: string
): Promise<void | (TextItem | TextMarkedContent)[]> => {
  const doc = await pdfjsLib.getDocument(fileRawData).promise;
  const page = await doc.getPage(1);
  const textContent = await page.getTextContent();
  return textContent.items;
};

export default parse;
