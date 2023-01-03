interface Props {
  status: string;
  date: string;
  description: string;
  currency: string;
  value: string;
  expirationDate: string;
}

const paymentStatus = {
  "open": "Open",
  "paid": "Betaald",
  "failed": "Niet gelukt",
  "expired": "Verlopen",
}

const PaymentTable = ({description, date, status, currency, value, expirationDate,...props}: Props) => {
  return (
    <tr {...props}>
      <td>{ description }</td>
      <td>{ currency } { value }</td>
      <td>{ paymentStatus[status as keyof typeof paymentStatus] }</td>
      <td>{ date }</td>
      <td>{ expirationDate }</td>
    </tr>
  );
};

export default PaymentTable;