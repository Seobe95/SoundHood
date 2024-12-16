type TimeToMSParams = {
  seconds?: number;
  minutes?: number;
  days?: number;
};

function timeToMilliseconds({
  days = 0,
  minutes = 0,
  seconds = 0,
}: TimeToMSParams): number {
  const oneMinute = 1000 * 60;
  const s = seconds * 1000;
  const m = minutes * oneMinute;
  const d = days * oneMinute * 60 * 24;
  return m + s + d;
}

export { timeToMilliseconds };
