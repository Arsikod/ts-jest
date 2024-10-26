export function Appointment(props: { customer: { firstName: string } }) {
  return <span>{props.customer.firstName}</span>;
}
