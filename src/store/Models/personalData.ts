import API from "../../static/api";
import { Instance, types } from "mobx-state-tree";

type TableDataRow = { [key: string]: string };
interface IPersonalDataStore extends Instance<typeof PersonalDataStore> {}

export const PersonalDataStore = types
  .model({
    items: types.array(types.frozen<TableDataRow>()),
  })
  .actions((self) => ({
    async uploadData(body: TableDataRow[]) {
      return await API.post("/uploadData", body);
    },
  }));

let _personalData: IPersonalDataStore;
export const usePersonalData = () => {
  if (!_personalData) {
    _personalData = PersonalDataStore.create({
      items: [],
    });
  }

  return _personalData;
};
