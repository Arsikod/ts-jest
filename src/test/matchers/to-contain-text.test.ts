import { toContainText } from ".";

describe("toContainText matcher", () => {
  it("returns pass is true when text is found in given DOM element", () => {
    const domElement: Partial<HTMLElement> = {
      textContent: "text to find",
    };

    const result = toContainText(domElement, "text to find");

    expect(result.pass).toBe(true);
  });

  it("returns pass is false when text is not found in given DOM element", () => {
    const domElement: Partial<HTMLElement> = {
      textContent: "",
    };

    const result = toContainText(domElement, "text not to find");

    expect(result.pass).toBe(false);
  });

  it("returns a message that contains the source line if no match", () => {
    const domElement: Partial<HTMLElement> = {
      textContent: "",
    };

    const result = toContainText(domElement, "text to find");

    expect(stripTerminalColor(result.message())).toContain(
      `expect(element).toContainText("text to find")`
    );
  });

  it("returns a message that contains the source line if negated match", () => {
    const domElement = {
      textContent: "text to find",
    };
    const result = toContainText(domElement, "text to find");
    expect(stripTerminalColor(result.message())).toContain(
      `expect(element).not.toContainText("text to find")`
    );
  });

  it("returns a message that contains an actual text", () => {
    const domElement: Partial<HTMLElement> = {
      textContent: "text to find",
    };

    const result = toContainText(domElement, "text to find");

    expect(stripTerminalColor(result.message())).toContain(
      `Actual text: "text to find"`
    );
  });
});

const stripTerminalColor = (text: string) => text.replace(/\x1B\[\d+m/g, "");
