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
    return await this.dataHandlers[dataProvider](fileRawData);
  },
};

export default pdp;
