import testDataHandler from "../dataHandlers/testDataHandler";

export enum DataProviders {
  "test" = "test",
}

export type PersonalDataSet = {
  colsDescription: string[];
  data: string[][];
};

export type DataHandler = (fileRawData: string) => Promise<PersonalDataSet>;

type Pdp = {
  dataHandlers: { [key in DataProviders]: DataHandler };
  process: (
    fileRawData: string,
    dataProvider: DataProviders
  ) => Promise<PersonalDataSet>;
};

const pdp: Pdp = {
  dataHandlers: { test: testDataHandler },

  async process(fileRawData, dataProvider) {
    const personalDataSet = await this.dataHandlers[dataProvider](fileRawData);

    personalDataSet.data.forEach((row, index) => {
      if (row.length !== personalDataSet.colsDescription.length) {
        throw new Error(
          `Incorrect cols description. Cols description length: ${personalDataSet.colsDescription.length}, row no: ${index}, row length: ${row.length}`
        );
      }
    });

    return personalDataSet;
  },
};

export default pdp;
