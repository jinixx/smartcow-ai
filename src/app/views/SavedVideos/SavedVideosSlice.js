import { /*createAsyncThunk,*/ createSlice } from '@reduxjs/toolkit';
// import { VideoEditorAPI } from './VideoEditorAPI';

const initialState = {
  videos: {}
};

export const SavedVideosSlice = createSlice({
  name: 'savedVideos',
  initialState,
  reducers: {
    addOrUpdateVideo: (state, { payload }) => {
      const { video } = payload;

      state.videos[video.id] = video;
    },
    removeVideo: (state, { payload }) => {
      const { videoId } = payload;

      delete state.videos[videoId];
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(createVideoRequest.pending, (state) => {
  //       state.status = 'loading';
  //       state.error = null;
  //     })
  //     .addCase(createVideoRequest.fulfilled, (state, action) => {
  //       const { id } = action.payload;
  //       state.status = 'idle';
  //       // state.user = {
  //       //   id,
  //       //   avatar,
  //       //   token
  //       // };
  //       // dispatch action to update video list
  //       state.error = null;
  //     })
  //     .addCase(createVideoRequest.rejected, (state, action) => {
  //       state.status = 'idle';
  //       state.error = action.error;
  //     })
  // },
});

export const { addOrUpdateVideo, removeVideo } = SavedVideosSlice.actions;

export const selectVideos = state => state.savedVideos.videos;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default SavedVideosSlice.reducer;
