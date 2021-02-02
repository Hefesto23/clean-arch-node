export interface IController {
  handle: (req, res) => Promise<any>;
}
