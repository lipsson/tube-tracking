/* eslint-disable class-methods-use-this,@typescript-eslint/no-empty-function */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';


// eslint-disable-next-line no-console
const originalError = console.error;

jest.setTimeout(960000);
beforeAll(() => {
  class ResizeObserver {
    observe() { }

    unobserve() { }

    disconnect() { }
  }

  jest.spyOn(console, 'error').mockImplementation((...args) => {
    if (typeof args[0] === 'string' && args[0].includes('Warning: An update to null inside a test was not')) {
      return;
    }
    // eslint-disable-next-line consistent-return
    return originalError.call(console, args);
  });

  global.ResizeObserver = ResizeObserver;
});


const localStorageMock = () => {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock() });
