export interface IHttpHandler {
  get(url: string, headers: Record<string, unknown>): Promise<any>;
}
