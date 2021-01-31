export interface IHttpHelper {
  get(url: string, headers: Record<string, unknown>): Promise<any>;
}
