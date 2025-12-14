export interface ChapaPaymentData {
  amount: number;
  currency: string;
  email: string;
  first_name: string;
  last_name: string;
  tx_ref: string;
  callback_url?: string;
  return_url?: string;
  customization?: {
    title?: string;
    description?: string;
  };
}

export const initializeChapaPayment = async (data: ChapaPaymentData) => {
  // In a real application, you would call your backend API here to initialize the transaction
  // securely using your Chapa Secret Key. The backend would then return the checkout_url.
  
  // For this demo, we'll simulate the process or use a test form if available.
  // Since we can't make cross-origin requests to Chapa directly from the browser with the secret key,
  // we will simulate a successful initialization.

  console.log('Initializing Chapa payment with data:', data);

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock response
  return {
    status: 'success',
    message: 'Payment initialized',
    data: {
      checkout_url: 'https://checkout.chapa.co/checkout/payment-mock', // This would be the real URL
    },
  };
};
