export function sample<T>(list: T[]): T {
  return list[sampleIdx(list)];
}

export function sampleIdx<T>(list: T[]): number {
  return Math.floor(Math.random() * list.length);
}
