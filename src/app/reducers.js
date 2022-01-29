import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../components/Auth/authSlice';
import VideoEditorReducer from '../app/views/VideoEditor/VideoEditorSlice';
import SavedVideosSlice from './views/SavedVideos/SavedVideosSlice';

const rootPersistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const authPersistConfig = {
  key: 'auth',
  storage,
  // blacklist: ['somethingTemporary']
}

const VideoEditorConfig = {
  key: 'videoEditor',
  storage
}

 const SavedVideosConfig = {
   key: 'savedVideos',
   storage
 }

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  videoEditor: persistReducer(VideoEditorConfig, VideoEditorReducer),
  savedVideos: persistReducer(SavedVideosConfig, SavedVideosSlice)
});

export default persistReducer(rootPersistConfig, rootReducer);