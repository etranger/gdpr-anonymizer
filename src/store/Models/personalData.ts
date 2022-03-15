import API from "../../servicces/api";
import { Instance, types } from "mobx-state-tree";

export interface IPersonalDataStore
  extends Instance<typeof PersonalDataStore> {}
export interface IPersonalDataModel
  extends Instance<typeof PersonalDataModel> {}

export const PersonalDataModel = types.model({
  date: types.optional(types.string, ""),
  name: types.optional(types.string, ""),
  amount: types.optional(types.maybeNull(types.number), null),
  quantity: types.optional(types.maybeNull(types.number), null),
  wallet: types.optional(types.string, ""),
  location: types.optional(types.string, ""),
});

export const PersonalDataStore = types
  .model({
    items: types.array(PersonalDataModel),
  })
  .actions((self) => ({
    async uploadData(body: IPersonalDataModel[]) {
      return await API.post("/operations", body);
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
