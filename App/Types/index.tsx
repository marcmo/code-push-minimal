export interface RootState {
  readonly app: AppState;
}
export interface AppState {
  readonly selectedTab: number;
}
