import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem, IReportsData, IPlanning, ISchedule } from './interfaces/interfaces';
import FakeData from '../../../FakeData';

const { reports, bankAccountsData, internetAccountsData, planning, schedule } = FakeData;

export interface IHomeState {
  reportsData: IReportsData[];
  invoicesData: Array<IItem[]>;
  keyBankAccountsData: string;
  keyInternetAccountsData: string;
  draftsData: {
    planning: IPlanning[];
    targetKeys: string[];
  };
  templatesData: ISchedule;
  pressedLocation: string;
}

const initialState: IHomeState = {
  reportsData: reports,
  invoicesData: [bankAccountsData, internetAccountsData],
  keyBankAccountsData: '',
  keyInternetAccountsData: '',
  draftsData: {
    planning,
    targetKeys: [],
  },
  templatesData: schedule,
  pressedLocation: '',
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setPressedLocation(state, action: PayloadAction<string>) {
      state.pressedLocation = action.payload;
    },
    setBankAccountsData(state, action: PayloadAction<IItem[]>) {
      state.invoicesData[0] = action.payload;
    },
    setInternetAccountsData(state, action: PayloadAction<IItem[]>) {
      state.invoicesData[1] = action.payload;
    },
    setPlanningData(state, action: PayloadAction<IPlanning[]>) {
      state.draftsData.planning = action.payload;
    },
    setTargetKeys(state, action: PayloadAction<string[]>) {
      state.draftsData.targetKeys = action.payload;
    },
    setNewChallenge(state, action: PayloadAction<IPlanning>) {
      state.draftsData.planning = [...state.draftsData.planning, action.payload];
    },
    setKeyBankAccountsData(state, action: PayloadAction<string>) {
      state.keyBankAccountsData = action.payload;
    },
    setKeyInternetAccountsData(state, action: PayloadAction<string>) {
      state.keyInternetAccountsData = action.payload;
    },
  },
});

export default homeSlice.reducer;
