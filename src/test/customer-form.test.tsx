import {
  changeValue,
  clickAction,
  element,
  initializeReactContainer,
  render,
  submit,
} from "./react-test-utils";

import { CustomerForm } from "../customer-form";

describe("CustomerForm", () => {
  const blankCustomer = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
  };

  beforeEach(() => {
    initializeReactContainer();
  });

  function itRendersAsATextBox(fieldName: string) {
    it("renders as a text box", () => {
      render(<CustomerForm original={blankCustomer} />);

      const formField = element<HTMLFormElement>("form").elements.namedItem(
        fieldName
      ) as HTMLInputElement;

      expect(formField).not.toBeNull();

      expect(formField.tagName).toEqual("INPUT");
      expect(formField.type).toEqual("text");
    });
  }

  function itIncludesTheExistingValue(
    fieldName: string,
    existingValue: string
  ) {
    it("includes existing value", () => {
      const customer = {
        firstName: existingValue,
        lastName: "Doe",
        phoneNumber: "012345",
      };

      render(<CustomerForm original={customer} />);

      const formField = element<HTMLFormElement>("form").elements.namedItem(
        fieldName
      ) as HTMLInputElement;

      expect(formField.value).toEqual(existingValue);
    });
  }

  function itRendersALabel(fieldName: string, labelText: string) {
    it(`renders label for the ${fieldName} field`, () => {
      render(<CustomerForm original={blankCustomer} />);

      const label = element<HTMLLabelElement>(`label[for=${fieldName}]`);
      expect(label).not.toBeNull();
    });

    it(`renders "${labelText}" as the label text`, () => {
      render(<CustomerForm original={blankCustomer} />);

      const label = element<HTMLLabelElement>(`label[for=${fieldName}]`);
      expect(label).toContainText(labelText);
    });
  }

  function itAssignsIdThatMatchesLabelId(fieldName: string) {
    it(`assigns an id that matches the label id to the ${fieldName} input`, () => {
      render(<CustomerForm original={blankCustomer} />);

      const formField = element<HTMLFormElement>("form").elements.namedItem(
        fieldName
      ) as HTMLInputElement;

      const label = element<HTMLLabelElement>(`label[for=${fieldName}]`);

      expect(formField.id).toEqual(label.htmlFor);
    });
  }

  function itSavesExistingValueWhenSubmitted<
    K extends keyof typeof blankCustomer
  >(existingValue: (typeof blankCustomer)[K], fieldName: K) {
    it("saves existing value when submitted", () => {
      expect.hasAssertions();

      render(
        <CustomerForm
          original={{
            ...blankCustomer,
            [fieldName]: existingValue,
          }}
          onSubmit={(customer: typeof blankCustomer) => {
            expect(customer[fieldName]).toEqual(existingValue);
          }}
        />
      );

      const submitButton = element<HTMLButtonElement>('button[type="submit"]');
      clickAction(submitButton);
    });
  }

  function itSubmitsNewValue(
    fieldName: keyof typeof blankCustomer,
    newValue: string
  ) {
    it("submits new value", () => {
      expect.hasAssertions();

      render(
        <CustomerForm
          original={blankCustomer}
          onSubmit={(customer: typeof blankCustomer) => {
            expect(customer[fieldName]).toEqual(newValue);
          }}
        />
      );

      changeValue(
        element<HTMLInputElement>(`input[name="${fieldName}"]`),
        newValue
      );

      const submitButton = element<HTMLButtonElement>('button[type="submit"]');
      clickAction(submitButton);
    });
  }

  describe("first name input field", () => {
    it("renders a form", () => {
      render(<CustomerForm original={blankCustomer} />);
      expect(element("form")).not.toBeNull();
    });

    itRendersAsATextBox("firstName");

    itIncludesTheExistingValue("firstName", "Ashley");

    itRendersALabel("firstName", "First Name");

    itAssignsIdThatMatchesLabelId("firstName");

    it("renders a submit button", () => {
      render(<CustomerForm original={blankCustomer} />);

      const submitButton = element<HTMLButtonElement>('button[type="submit"]');
      expect(submitButton).not.toBeNull();
    });

    itSavesExistingValueWhenSubmitted("Ashley", "firstName");

    it("prevents the default action when submitting the form", () => {
      render(<CustomerForm original={blankCustomer} onSubmit={jest.fn()} />);

      const event = submit(element<HTMLFormElement>("form"));

      expect(event.defaultPrevented).toBe(true);
    });

    it("renders submit button", () => {
      render(<CustomerForm original={blankCustomer} />);
      expect(element('button[type="submit"]')).not.toBeNull();
    });

    itSubmitsNewValue("firstName", "Jamie");
  });

  describe("last name input field", () => {
    it("renders a form", () => {
      render(<CustomerForm original={blankCustomer} />);
      expect(element("form")).not.toBeNull();
    });

    itRendersAsATextBox("lastName");

    itIncludesTheExistingValue("lastName", "Doe");

    itRendersALabel("lastName", "Last Name");

    itAssignsIdThatMatchesLabelId("lastName");

    it("renders a submit button", () => {
      render(<CustomerForm original={blankCustomer} />);

      const submitButton = element<HTMLButtonElement>('button[type="submit"]');
      expect(submitButton).not.toBeNull();
    });

    itSavesExistingValueWhenSubmitted("Doe", "lastName");

    it("prevents the default action when submitting the form", () => {
      render(<CustomerForm original={blankCustomer} onSubmit={jest.fn()} />);

      const event = submit(element<HTMLFormElement>("form"));

      expect(event.defaultPrevented).toBe(true);
    });

    it("renders submit button", () => {
      render(<CustomerForm original={blankCustomer} />);
      expect(element('button[type="submit"]')).not.toBeNull();
    });

    itSubmitsNewValue("lastName", "Watson");
  });

  describe("phone number input field", () => {
    it("renders a form", () => {
      render(<CustomerForm original={blankCustomer} />);
      expect(element("form")).not.toBeNull();
    });

    itRendersAsATextBox("phoneNumber");

    itIncludesTheExistingValue("phoneNumber", "012345");

    itRendersALabel("phoneNumber", "Phone Number");

    itAssignsIdThatMatchesLabelId("phoneNumber");

    it("renders a submit button", () => {
      render(<CustomerForm original={blankCustomer} />);

      const submitButton = element<HTMLButtonElement>('button[type="submit"]');
      expect(submitButton).not.toBeNull();
    });

    itSavesExistingValueWhenSubmitted("012345", "phoneNumber");

    it("prevents the default action when submitting the form", () => {
      render(<CustomerForm original={blankCustomer} onSubmit={jest.fn()} />);

      const event = submit(element<HTMLFormElement>("form"));

      expect(event.defaultPrevented).toBe(true);
    });

    it("renders submit button", () => {
      render(<CustomerForm original={blankCustomer} />);
      expect(element('button[type="submit"]')).not.toBeNull();
    });

    itSubmitsNewValue("phoneNumber", "543210");
  });
});
