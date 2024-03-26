import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isPlaying: false,
  currentTrack: null,
  volume: 50, // Example volume level
  // Add other features/state you want to manage
}
export const track = createSlice({
  name: 'track',
  initialState,
  reducers: {
    playTrack(state, action) {
      state.isPlaying = true
      state.currentTrack = action.payload
    },
    pauseTrack(state) {
      state.isPlaying = false
    },
    setVolume(state, action) {
      state.volume = action.payload
    },
  },
})

export const { playTrack, pauseTrack, setVolume } = track.actions
export default track.reducer
