export function fetchResponseOk(body: string) {
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
