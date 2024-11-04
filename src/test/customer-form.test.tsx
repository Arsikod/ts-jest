import { Customer, CustomerForm } from "../customer-form";
import {
  changeValue,
  clickAction,
  clickAndWait,
  element,
  field,
  initializeReactContainer,
  render,
  submit,
  withFocus,
} from "./react-test-utils";
import { fetchResponseError, fetchResponseOk } from "./builders/fetch";

import { bodyOfLastFetchCall } from "./spyHelpers";

describe("CustomerForm", () => {
  const blankCustomer: Customer = {
    id: 123,
    firstName: "",
    lastName: "",
    phoneNumber: "",
  };

  beforeEach(() => {
    initializeReactContainer();
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue(fetchResponseOk("ok") as Response);
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
        id: 123,
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

  function itSubmitsExistingValue<K extends keyof Customer>(
    existingValue: Customer[K],
    fieldName: K
  ) {
    it("saves existing value when submitted", () => {
      const customer: Customer = {
        ...blankCustomer,
        [fieldName]: existingValue,
      };

      render(<CustomerForm original={customer} />);

      const submitButton = element<HTMLButtonElement>('button[type="submit"]');
      clickAction(submitButton);

      expect(bodyOfLastFetchCall()).toMatchObject(customer);
    });
  }

  function itSubmitsNewValue(fieldName: keyof Customer, newValue: string) {
    it("submits new value", () => {
      render(<CustomerForm original={blankCustomer} />);

      changeValue(
        element<HTMLInputElement>(`input[name="${fieldName}"]`),
        newValue
      );

      const submitButton = element<HTMLButtonElement>('button[type="submit"]');
      clickAction(submitButton);

      expect(bodyOfLastFetchCall()).toMatchObject({
        ...blankCustomer,
        [fieldName]: newValue,
      });
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

    itSubmitsExistingValue("Ashley", "firstName");

    it("prevents the default action when submitting the form", () => {
      render(<CustomerForm original={blankCustomer} />);

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

    itSubmitsExistingValue("Doe", "lastName");

    it("prevents the default action when submitting the form", () => {
      render(<CustomerForm original={blankCustomer} />);

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

    itSubmitsExistingValue("012345", "phoneNumber");

    it("prevents the default action when submitting the form", () => {
      render(<CustomerForm original={blankCustomer} />);

      const event = submit(element<HTMLFormElement>("form"));

      expect(event.defaultPrevented).toBe(true);
    });

    it("renders submit button", () => {
      render(<CustomerForm original={blankCustomer} />);
      expect(element('button[type="submit"]')).not.toBeNull();
    });

    itSubmitsNewValue("phoneNumber", "543210");
  });

  it("calls fetch with the right URL when submitted", () => {
    render(<CustomerForm original={blankCustomer} />);

    const submitButton = element<HTMLButtonElement>('button[type="submit"]');
    clickAction(submitButton);

    expect(global.fetch).toBeCalledWith(
      "/customers",

      expect.objectContaining({
        method: "POST",
      })
    );
  });

  it("calls fetch with right configuration", () => {
    render(<CustomerForm original={blankCustomer} />);

    const submitButton = element<HTMLButtonElement>('button[type="submit"]');
    clickAction(submitButton);

    expect(global.fetch).toBeCalledWith(
      expect.anything(),
      expect.objectContaining({
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  });

  it("notifies onSave when form is submitted", async () => {
    const customer = {
      id: 123,
    };

    (global.fetch as jest.Mock).mockResolvedValue(
      fetchResponseOk(JSON.stringify(customer))
    );

    const saveSpy = jest.fn();

    render(<CustomerForm original={blankCustomer} onSave={saveSpy} />);

    await clickAndWait(element<HTMLButtonElement>('button[type="submit"]'));

    expect(saveSpy).toBeCalledWith(JSON.stringify(customer));
  });

  it("renders an alert space", async () => {
    render(<CustomerForm original={blankCustomer} />);

    expect(element<HTMLDivElement>("[role=alert]")).not.toBeNull();
  });

  describe("when POST returns an error", () => {
    beforeEach(() => {
      jest
        .spyOn(global, "fetch")
        .mockResolvedValue(fetchResponseError() as Response);
    });

    it("renders an error message", async () => {
      render(<CustomerForm original={blankCustomer} />);

      await clickAndWait(element<HTMLButtonElement>('button[type="submit"]'));

      expect(element<HTMLDivElement>("[role=alert]")).toContainText(
        "An error occurred"
      );
    });

    it("does not notify onSave", async () => {
      const saveSpy = jest.fn();

      render(<CustomerForm original={blankCustomer} onSave={saveSpy} />);

      await clickAndWait(element<HTMLButtonElement>('button[type="submit"]'));

      expect(saveSpy).not.toHaveBeenCalled();
    });
  });

  describe("validation", () => {
    it("renders an alert space for first name validation errors", () => {
      render(<CustomerForm original={blankCustomer} />);
      expect(element("#firstNameError[role=alert")).not.toBeNull();
    });

    it("sets alert as the accessible description for the first name input", async () => {
      render(<CustomerForm original={blankCustomer} />);

      expect(field("firstName").getAttribute("aria-describedby")).toEqual(
        "firstNameError"
      );
    });

    it("displays error after blur when first name field is blank", async () => {
      render(<CustomerForm original={blankCustomer} />);

      withFocus(field("firstName"), () => {
        changeValue(field("firstName"), "");
      });

      expect(element("#firstNameError[role=alert]")).toContainText(
        "First name is required"
      );
    });

    it("initially has no text in the first name field alert space", () => {
      render(<CustomerForm original={blankCustomer} />);

      expect(element("#firstNameError[role=alert]").textContent).toEqual("");
    });
  });
});
