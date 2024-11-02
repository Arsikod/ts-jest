export function fetchResponseOk(body: unknown) {
  return {
    ok: true,
    json: () => Promise.resolve(body),
  };
}

export function fetchResponseError() {
  return {
    ok: false,
  };
}
