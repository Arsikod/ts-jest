import { Root, createRoot } from "react-dom/client";

import { act } from "react";

let container: HTMLDivElement | null = null;
let reactRoot: Root;

export function initializeReactContainer() {
  container = document.createElement("div");
  document.body.replaceChildren(container);
  reactRoot = createRoot(container);
}

export function render(component: JSX.Element) {
  act(() => {
    reactRoot.render(component);
  });
}

export function renderAndWait(component: JSX.Element) {
  return act(async () => reactRoot.render(component));
}

export function clickAction<T extends HTMLElement>(element: T) {
  act(() => element.click());
}

export function element<T extends HTMLElement>(selector: string): T {
  return document.querySelector(selector);
}

export function elements<T extends Element>(selector: string): T[] {
  return Array.from(document.querySelectorAll<T>(selector));
}

export function typesOf<T extends { type: string }>(elements: T[]) {
  return elements.map((element) => element.type);
}

export function textOf(elements: HTMLElement[]) {
  return elements.map((element) => element.textContent);
}

export function submit(form: HTMLFormElement) {
  const event = new Event("submit", {
    bubbles: true,
    cancelable: true,
  });

  act(() => {
    form.dispatchEvent(event);
  });

  return event;
}

export function originalValueProperty(reactElement: HTMLElement) {
  const prototype = Object.getPrototypeOf(reactElement);

  return Object.getOwnPropertyDescriptor(prototype, "value");
}

export function changeValue(target: HTMLElement, value: string) {
  originalValueProperty(target).set.call(target, value);

  const event = new Event("change", {
    bubbles: true,
  });

  Object.defineProperty(event, "target", { writable: false });

  act(() => target.dispatchEvent(event));
}

export function form(): HTMLFormElement {
  return element("form");
}

export function field<T extends Element>(fieldName: string): T {
  return form().elements.namedItem(fieldName) as T;
}

export function submitButton(): HTMLButtonElement {
  return element("input[type=submit]");
}

export async function clickAndWait(element: HTMLElement) {
  await act(async () => clickAction(element));
}

export function propsOf<T extends (...args: any[]) => any>(
  mockComponent: jest.MockedFunction<T>
) {
  return mockComponent.mock.calls[mockComponent.mock.calls.length - 1][0];
}

export function withFocus(target: HTMLElement, fn: () => void) {
  act(() => {
    target.focus();
    fn();
    target.blur();
  });
}

