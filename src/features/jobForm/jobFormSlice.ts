import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { createAppliance, updateAppliance } from "../../api/applianceAPI";
import { createJob, updateJob } from "../../api/jobAPI";

export interface JobState {
  _id: string;
  deviceId: string;
  jobName: string;
  startTime: string;
  endTime: string;
}

const initialState: JobState = {
  _id: "null",
  deviceId: "null",
  jobName: "null",
  startTime: "",
  endTime: "",
};

export const JobFormSlice = createSlice({
  name: "JobForm",
  initialState,
  reducers: {
    addJob: (state, action: PayloadAction<JobState>) => {
      //console.log(action);
      state.deviceId = action.payload.deviceId;
      state.jobName = action.payload.jobName;
      state.startTime = action.payload.startTime;
      state.endTime = action.payload.endTime;
    },
    updatedJobReducer: (state, action: PayloadAction<JobState>) => {
      //console.log(action);
      state._id = action.payload._id;
      state.deviceId = action.payload.deviceId;
      state.jobName = action.payload.jobName;
      state.startTime = action.payload.startTime;
      state.endTime = action.payload.endTime;
    },
    // increment: state => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: state => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { addJob, updatedJobReducer } = JobFormSlice.actions;

export const createNewJob = (
  deviceId: string,
  jobName: string,
  startTime: string,
  endTime: string
): AppThunk => async (dispatch) => {
  try {
    const job = await createJob(deviceId, jobName, startTime, endTime);
    console.log(job);
    dispatch(addJob(job));
  } catch (err) {
    console.log(err);
  }
};

export const updateExistingJob = (
  _id: string,
  deviceId: string,
  jobName: string,
  startTime: string,
  endTime: string
): AppThunk => async (dispatch) => {
  try {
    const job = await updateJob(_id, deviceId, jobName, startTime, endTime);
    dispatch(updatedJobReducer(job));
  } catch (err) {
    console.log(err);
  }
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const getApplianceById = (id: string): AppThunk => dispatch => {
//   fetch('/article/fetch/post/image', {
//     method: 'POST',
//     body: blob
//   }).then((response) => {
//     console.log(response);
//     );
// };

// export const incrementAsync = (amount: number): AppThunk => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.Appliance.value)`
export const selectJob = (state: RootState) => state.appliance;

export default JobFormSlice.reducer;
