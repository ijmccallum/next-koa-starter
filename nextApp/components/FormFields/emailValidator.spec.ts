import emailValidator from "./emailValidator";

describe("Email validator", () => {
  it("Returns true for valid emails", () => {
    expect(emailValidator("valid@email.com")).toBe(true);
    expect(emailValidator("valid@uk.co.uk")).toBe(true);
    expect(emailValidator("valid@world.co")).toBe(true);
  });

  it("Returns false for invalid emails", () => {
    expect(emailValidator("no@tld")).toBe(false);
    expect(emailValidator("just.com")).toBe(false);
    expect(emailValidator("ahh!")).toBe(false);
  });
});
