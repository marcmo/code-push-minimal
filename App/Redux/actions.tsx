export enum AppActionTypes {
  TAB_SELECTED = 'TAB_SELECTED',
  FOO_BAR = 'FOO_BAR',
}
export type AppAction =
  TabSelected |
  FooBar;
export interface TabSelected {
  type: AppActionTypes.TAB_SELECTED;
  payload: {
    index: number;
  };
}
export interface FooBar {
  type: AppActionTypes.FOO_BAR;
}
export const selectedTab = (index: number): TabSelected => ({
  type: AppActionTypes.TAB_SELECTED,
  payload: {
    index,
  },
});
export const createFooBarAction = (): FooBar => ({
  type: AppActionTypes.FOO_BAR,
});
