import { wait } from "../src/wait";
import { describe, expect, it } from "@jest/globals";

describe("status-checker", () => {
  it("throws invalid number when given 'foo' string", async () => {
    const input = parseInt("foo", 10);
    await expect(wait(input)).rejects.toThrow("milliseconds not a number");
  });

  it("call to 'wait' actually waits 500 ms", async () => {
    const start = new Date();
    await wait(500);
    const end = new Date();
    var delta = Math.abs(end.getTime() - start.getTime());
    expect(delta).toBeGreaterThan(450);
  });
});
