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

export function CustomerForm({ original, onSave }: CustomerFormProps) {
  const [customer, setCustomer] = useState(original);
  const [fetchError, setFetchError] = useState(false);

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

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        name="firstName"
        id="firstName"
        type="text"
        value={customer.firstName}
        onChange={handleChange}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        value={customer.lastName}
        onChange={handleChange}
      />
      <label htmlFor="phoneNumber">Phone Number</label>
      <input
        type="text"
        name="phoneNumber"
        id="phoneNumber"
        value={customer.phoneNumber}
        onChange={handleChange}
      />
      <button type="submit">Add</button>
      {fetchError && <ErrorAlert message="An error occurred" />}
    </form>
  );
}

function ErrorAlert({ message }: { message: string }) {
  return <p role="alert">{message}</p>;
}
