import '@testing-library/jest-dom';

declare global {
  namespace Vi {
    interface JestAssertion<T = any> {
      toBeInTheDocument(): T;
      toHaveClass(...classNames: string[]): T;
      toBeDisabled(): T;
      toHaveAttribute(attr: string, value?: string): T;
      toHaveStyle(css: string | Record<string, any>): T;
      toHaveTextContent(text: string | RegExp): T;
      toBeVisible(): T;
      toContainElement(element: HTMLElement | null): T;
      toHaveValue(value: string | string[] | number | null): T;
      toBeChecked(): T;
      toHaveFocus(): T;
      toHaveFormValues(expectedValues: Record<string, any>): T;
      toHaveDescription(text: string | RegExp): T;
    }
  }
}
