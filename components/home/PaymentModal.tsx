import { useState } from "react";
import PaymentApi from "../../lib/api/payments";
import Button from "../common/Button";
import Heading from "../common/Heading";

interface Props {
    userId: string;
    onError: (error: any) => void;
}

const PaymentModal = ({ userId, onError }: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = async () => {
        setIsLoading(true);

        try {
            const payment = await PaymentApi.make(userId, "8327698165444904000");

            window.location.assign(payment.checkoutUrl);
        } catch(e) {
            onError(e);
            setIsLoading(false);
        }
    }

    return <div className="my-4">
        <Heading as="h3">Je hebt nog geen toegang tot Q4Care</Heading>
        <Button variant="primary" rounded  className="mt-4" onClick={handlePayment} loading={isLoading}>Toegang krijgen voor €30.00 per jaar</Button>
    </div>
}

export default PaymentModal;