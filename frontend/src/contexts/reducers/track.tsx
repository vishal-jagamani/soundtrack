import { createSlice } from '@reduxjs/toolkit'
export const track = createSlice({
  name: 'track',
  initialState: {
    playing: {},
  },
  reducers: {
    play: (state, action) => {
      state.playing = action.payload
    },
  },
})

export const { play } = track.actions
export default track.reducer
