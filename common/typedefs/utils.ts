/* eslint-disable @typescript-eslint/no-explicit-any */

type Primitive = string | number | boolean | symbol | null | undefined;

export type Paths<T, Prefix extends string = ''> = {
  [K in keyof T]: T[K] extends Primitive
    ? `${Prefix}${K & string}`
    : T[K] extends object
      ? `${Prefix}${K & string}` | Paths<T[K], `${Prefix}${K & string}.`>
      : never;
}[keyof T];

type AllPaths<T, Prefix extends string = ''> = T extends Primitive
  ? never
  : T extends Array<any>
    ? Prefix
    : {
        [K in keyof T]: T[K] extends Primitive
          ? `${Prefix}${K & string}`
          : `${Prefix}${K & string}` | AllPaths<T[K], `${Prefix}${K & string}.`>;
      }[keyof T];

type Distribute<T> = T extends any ? T : never;

export type DeepPaths<T> = Distribute<AllPaths<T>>;
