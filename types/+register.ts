import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/gradient-button-demo": {};
  "/moving-border-demo": {};
  "/sparkles-demo": {};
  "/examples": {};
  "/confirm": {};
  "/skips": {};
};