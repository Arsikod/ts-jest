import { toBeRenderedWithProps } from "./to-be-rendered-with-props";
import { toContainText } from ".";

expect.extend({
  toContainText,
  toBeRenderedWithProps,
});
