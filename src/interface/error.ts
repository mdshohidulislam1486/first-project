export type TErrorSources = {
  path: string | number;
  message: string;
}[];
export type TGenericErroReturn = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
