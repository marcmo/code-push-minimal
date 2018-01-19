export const date2number = (d: Date): number => d.getTime();
export const number2date = (n: number): Date => new Date(n);
export const now = (): number => date2number(new Date());
export const renderTime = (timeoutInSeconds: number): string => {
  const secs = timeoutInSeconds % 60;
  if (timeoutInSeconds >= 60) {
    const minutes = Math.floor(timeoutInSeconds / 60);
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
  }
  return `${secs} s`;
};
