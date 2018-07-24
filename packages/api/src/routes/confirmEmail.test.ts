import fetch from "node-fetch";

const host = process.env.TEST_HOST as string;

test("use invalid id", async () => {
  const response = await fetch(`${host}/confirm/123`);
  const text = await response.text();
  expect(text).toEqual("invalid");
});
