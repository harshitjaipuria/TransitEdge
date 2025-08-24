import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  DATA_COLORS,
  LAYOUT_CONTENT_WIDTH,
  LAYOUT_DIRECTION,
  LAYOUT_MODE_TYPES,
  LAYOUT_TYPES,
  SIDEBAR_COLOR,
  LAYOUT_LANGUAGES,
  MODERN_NAVIGATION,
  DARK_MODE_CLASS,
  SIDEBAR_SIZE,
} from '@src/components/constants/layout'

export interface LayoutItemsState {
  layoutType:
    | LAYOUT_TYPES.HORIZONTAL
    | LAYOUT_TYPES.VERTICAL
    | LAYOUT_TYPES.MODERN
    | LAYOUT_TYPES.BOXED
    | LAYOUT_TYPES.SEMIBOX
  layoutWidth: LAYOUT_CONTENT_WIDTH.DEFAULT | LAYOUT_CONTENT_WIDTH.FLUID
  layoutMode:
    | LAYOUT_MODE_TYPES.LIGHT
    | LAYOUT_MODE_TYPES.DARK
    | LAYOUT_MODE_TYPES.DEFAULT
    | LAYOUT_MODE_TYPES.BLACK_WHITE
  layoutSidebar: SIDEBAR_SIZE.DEFAULT | SIDEBAR_SIZE.MEDIUM | SIDEBAR_SIZE.SMALL
  layoutSidebarColor:
    | SIDEBAR_COLOR.LIGHT
    | SIDEBAR_COLOR.DARK
    | SIDEBAR_COLOR.BRAND
    | SIDEBAR_COLOR.PURPLE
    | SIDEBAR_COLOR.SKY
  layoutDirection: LAYOUT_DIRECTION.LTR | LAYOUT_DIRECTION.RTL
  layoutDataColor:
    | DATA_COLORS.DEFAULT
    | DATA_COLORS.GREEN
    | DATA_COLORS.VIOLET
    | DATA_COLORS.ORANGE
    | DATA_COLORS.TEAL
    | DATA_COLORS.FUCHSIA
    | DATA_COLORS.LIME
    | DATA_COLORS.AMBER
  layoutLanguages:
    | LAYOUT_LANGUAGES.ARABIC
    | LAYOUT_LANGUAGES.CHINESE
    | LAYOUT_LANGUAGES.DUTCH
    | LAYOUT_LANGUAGES.ENGLISH
    | LAYOUT_LANGUAGES.FRENCH
    | LAYOUT_LANGUAGES.GERMAN
    | LAYOUT_LANGUAGES.HEBREW
    | LAYOUT_LANGUAGES.GERMAN
    | LAYOUT_LANGUAGES.HEBREW
    | LAYOUT_LANGUAGES.ITALIAN
    | LAYOUT_LANGUAGES.KOREAN
    | LAYOUT_LANGUAGES.PORTUGUESE
    | LAYOUT_LANGUAGES.RUSSIAN
    | LAYOUT_LANGUAGES.SPANISH
    | LAYOUT_LANGUAGES.TURKISH
    | LAYOUT_LANGUAGES.VIETNAMESE
  layoutNavigation:
    | MODERN_NAVIGATION.DEFAULT
    | MODERN_NAVIGATION.FLOATING
    | MODERN_NAVIGATION.BOXED
    | MODERN_NAVIGATION.PATTERN
  layoutDarkModeClass:
    | DARK_MODE_CLASS.DEFAULT
    | DARK_MODE_CLASS.ZINC
    | DARK_MODE_CLASS.STONE
    | DARK_MODE_CLASS.NEUTRAL
    | DARK_MODE_CLASS.GRAY
  isSettingModalOpen: boolean
}

export const initialState: LayoutItemsState = {
  layoutType: LAYOUT_TYPES.VERTICAL,
  layoutWidth: LAYOUT_CONTENT_WIDTH.DEFAULT,
  layoutMode: LAYOUT_MODE_TYPES.LIGHT,
  layoutSidebar: SIDEBAR_SIZE.DEFAULT,
  layoutSidebarColor: SIDEBAR_COLOR.LIGHT,
  layoutDirection: LAYOUT_DIRECTION.LTR,
  layoutDataColor: DATA_COLORS.DEFAULT,
  layoutLanguages: LAYOUT_LANGUAGES.ENGLISH,
  layoutNavigation: MODERN_NAVIGATION.DEFAULT,
  layoutDarkModeClass: DARK_MODE_CLASS.DEFAULT,
  isSettingModalOpen: false,
}

const LayoutSlice = createSlice({
  name: 'layoutdata',
  initialState,
  reducers: {
    changeLayoutAction(state: any, action: PayloadAction<LAYOUT_TYPES>) {
      state.layoutType = action.payload
    },
    changeLayoutWidthAction(state: any, action: PayloadAction<LAYOUT_CONTENT_WIDTH>) {
      state.layoutWidth = action.payload
    },
    changeLayoutModeAction(state: any, action: PayloadAction<LAYOUT_MODE_TYPES>) {
      state.layoutMode = action.payload
    },
    changeLayoutSidebarAction(state: any, action: PayloadAction<SIDEBAR_SIZE>) {
      state.layoutSidebar = action.payload
    },
    changeLayoutSidebarColorAction(state: any, action: PayloadAction<SIDEBAR_COLOR>) {
      state.layoutSidebarColor = action.payload
    },
    changeLayoutDirectionAction(state: any, action: PayloadAction<LAYOUT_DIRECTION>) {
      state.layoutDirection = action.payload
    },
    changeLayoutDataColorAction(state: any, action: PayloadAction<DATA_COLORS>) {
      state.layoutDataColor = action.payload
    },
    changeLayoutLanguageAction(state: any, action: PayloadAction<LAYOUT_LANGUAGES>) {
      state.layoutLanguages = action.payload
    },
    changeLayoutModalNavigationAction(state: any, action: PayloadAction<MODERN_NAVIGATION>) {
      state.layoutNavigation = action.payload
    },
    changeLayoutDarkModeClass(state: any, action: PayloadAction<DARK_MODE_CLASS>) {
      state.layoutDarkModeClass = action.payload
    },
    changeSettingModalOpen(state: any, action: PayloadAction<boolean>) {
      state.isSettingModalOpen = action.payload
    },
  },
})

export const {
  changeLayoutAction,
  changeLayoutWidthAction,
  changeLayoutModeAction,
  changeLayoutSidebarAction,
  changeLayoutSidebarColorAction,
  changeLayoutDirectionAction,
  changeLayoutDataColorAction,
  changeLayoutLanguageAction,
  changeLayoutModalNavigationAction,
  changeLayoutDarkModeClass,
  changeSettingModalOpen,
} = LayoutSlice.actions

export default LayoutSlice.reducer
