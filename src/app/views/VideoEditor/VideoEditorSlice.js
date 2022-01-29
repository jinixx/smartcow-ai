import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VideoEditorAPI } from './VideoEditorAPI';
import { addOrUpdateVideo } from '../SavedVideos/SavedVideosSlice';

const initialState = {
  id: '',
  name: '',
  tags: '',
  videoScript: '',
  actorId: '',
  videoSrc: '',
  videoThumbSrc: '',
  voiceId: '',
  voiceSrc: '',
  alignment: '',
  backgroundType: '',
  backgroundParam: '',
  status: 'idle',
  error: null
};

export const saveVideo = createAsyncThunk(
  'videoEditor/saveVideo',
  async ({ videoId = '' }, { dispatch, getState, rejectWithValue }) => {
    const video = {
      ...getState().videoEditor
    }
    delete video.status;
    delete video.error;

    if (videoId) video.id = videoId;

    dispatch(addOrUpdateVideo({ video }));

    const response = await VideoEditorAPI.saveVideo(video);

    return response;
  }
);

export const loadVideo = createAsyncThunk(
  'videoEditor/loadVideo',
  async ({ videoId }, { dispatch, getState, rejectWithValue }) => {
    const video = getState().savedVideos.videos[videoId];

    if (!video) return rejectWithValue('404');

    return video;
  }
)

export const VideoEditorSlice = createSlice({
  name: 'videoEditor',
  initialState,
  reducers: {
    saveTitle: (state, { payload }) => {
      const { name, tags } = payload;

      state.name = name;
      state.tags = tags.filter(x => x !== '').join();
    },
    setVideoScript: (state, { payload }) => {
      const { videoScript } = payload;

      state.videoScript = videoScript;
    },
    setActor: (state, { payload }) => {
      const { actorId, videoSrc, videoThumbSrc } = payload;

      state.actorId = actorId;
      state.videoSrc = videoSrc;
      state.videoThumbSrc = videoThumbSrc;
    },
    setVideo: (state, { payload }) => {
      const { videoSrc, videoThumbSrc } = payload;

      state.videoSrc = videoSrc;
      state.videoThumbSrc = videoThumbSrc;
    },
    setVoice: (state, { payload }) => {
      const { voiceId, voiceSrc } = payload;

      state.voiceId = voiceId;
      state.voiceSrc = voiceSrc;
    },
    setAlignment: (state, { payload }) => {
      const { alignment } = payload;

      state.alignment = alignment;
    },
    setBackground: (state, { payload }) => {
      const { backgroundType, backgroundParam } = payload;

      state.backgroundType = backgroundType;
      state.backgroundParam = backgroundParam;
    },
    reset: (state, action) => {
      return state = { ...initialState };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveVideo.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(saveVideo.fulfilled, (state, action) => {
        console.log('save video fulfilled:', action.payload);
        // state.status = 'idle';
        // state.error = null;
        return state = { ...initialState };
      })
      .addCase(saveVideo.rejected, (state, action) => {
        // TODO:
        // if save to server failed, we could set a flag
        // then, trigger a timed auto retry in the background and network watch

        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(loadVideo.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadVideo.fulfilled, (state, action) => {
        console.log('load video fulfilled:', action.payload);
        return state = { ...initialState, ...action.payload };
      })
      .addCase(loadVideo.rejected, (state, action) => {
        state.error = { message: action.payload };
      })
  },
});

export const { saveTitle, setVideoScript, setActor, setVideo, setVoice, setAlignment, setBackground, reset } = VideoEditorSlice.actions;

export const selectName = state => state.videoEditor.name;
export const selectTags = state => state.videoEditor.tags.split(',').filter(x => x !== '');
export const selectVideoScript = state => state.videoEditor.videoScript;
export const selectActorId = state => state.videoEditor.actorId;
export const selectVideoSrc = state => state.videoEditor.videoSrc;
export const selectVideoThumbSrc = state => state.videoEditor.videoThumbSrc;
export const selectVoiceId = state => state.videoEditor.voiceId;
export const selectVoiceSrc = state => state.videoEditor.voiceSrc;
export const selectAlignment = state => state.videoEditor.alignment;
export const selectBackgroundParam = state => state.videoEditor.backgroundParam;
export const selectIsLoading = state => state.videoEditor.status === 'loading';
export const selectError = state => state.videoEditor.error;
export const selectIsEditingVideo = state => state.videoEditor.id !== '';

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default VideoEditorSlice.reducer;
