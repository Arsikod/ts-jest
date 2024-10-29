import { useState } from "react";

type CustomerFormProps = {
  original?: { firstName: string; lastName: string; phoneNumber: string };
  onSubmit?: (customer: { firstName: string }) => void;
};

export function CustomerForm({ original, onSubmit }: CustomerFormProps) {
  const [customer, setCustomer] = useState(original);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCustomer((customer) => ({
      ...customer,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onSubmit && onSubmit(customer);
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
    </form>
  );
}
