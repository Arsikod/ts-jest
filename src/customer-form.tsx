import { useState } from "react";

export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

type CustomerFormProps = {
  original?: Customer;
  onSave?: (customer: Customer) => void;
};

type Validator = (value: string) => string | undefined;
function required(description: string) {
  return (value: string) =>
    !value || value.trim() === "" ? description : undefined;
}

function match(regEx: RegExp, description: string) {
  return (value: string) => (!value.match(regEx) ? description : undefined);
}

function list(...validators: Validator[]) {
  return (value: string) => {
    for (const validator of validators) {
      const result = validator(value);

      if (result) {
        return result;
      }
    }

    return undefined;
  };
}

export function CustomerForm({ original, onSave }: CustomerFormProps) {
  const [customer, setCustomer] = useState(original);
  const [fetchError, setFetchError] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  function handleBlur({ target }: React.FocusEvent<HTMLInputElement>) {
    const validators: Record<string, Validator> = {
      firstName: required("First name is required"),
      lastName: required("Last name is required"),
      phoneNumber: list(
        required("Phone number is required"),
        match(/^[0-9+()\-]*$/, "Only numbers, spaces, and dashes are allowed")
      ),
    };

    const result = validators[target.name](target.value);

    setValidationErrors({
      ...validationErrors,
      [target.name]: result,
    });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCustomer((customer) => ({
      ...customer,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const result = await fetch("/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(customer),
    });

    if (result.ok) {
      const customerWithId = await result.json();
      onSave && onSave(customerWithId);
    } else {
      setFetchError(true);
    }
  }

  function hasFieldError(fieldName: string) {
    return validationErrors[fieldName] !== undefined;
  }

  function renderError(fieldName: string) {
    return (
      <span id={`${fieldName}Error`} role="alert">
        {hasFieldError(fieldName) ? validationErrors[fieldName] : ""}
      </span>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        name="firstName"
        id="firstName"
        type="text"
        value={customer.firstName}
        onChange={handleChange}
        aria-describedby="firstNameError"
        onBlur={handleBlur}
      />
      {renderError("firstName")}
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        value={customer.lastName}
        onChange={handleChange}
        aria-describedby="lastNameError"
        onBlur={handleBlur}
      />
      {renderError("lastName")}
      <label htmlFor="phoneNumber">Phone Number</label>
      <input
        type="text"
        name="phoneNumber"
        id="phoneNumber"
        value={customer.phoneNumber}
        onChange={handleChange}
        aria-describedby="phoneNumberError"
        onBlur={handleBlur}
      />
      {renderError("phoneNumber")}
      <button type="submit">Add</button>
      {fetchError && <ErrorAlert message="An error occurred" />}
    </form>
  );
}

function ErrorAlert({ message }: { message: string }) {
  return <p role="alert">{message}</p>;
}
