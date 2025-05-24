import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum ThemeType {
    LIGHT = "light",
    DARK = "dark",
}

const savedTheme = localStorage.getItem('theme')

interface ThemeSlice {
    theme: ThemeType
}

const initialState: ThemeSlice = {
    theme: savedTheme ? JSON.parse(savedTheme) : ThemeType.DARK,
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<ThemeType>) => {
            state.theme = action.payload
            localStorage.setItem('theme', JSON.stringify(action.payload))
            console.log(state.theme)
        }
    }
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer
