import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const MockPayment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const amount = searchParams.get('amount');
  const subject = searchParams.get('subject');
  const returnUrl = searchParams.get('return_url') || '/';

  const handlePayment = () => {
    setProcessing(true);
    // Simulate network request
    setTimeout(() => {
      // Redirect back with success status
      const url = new URL(returnUrl, window.location.origin);
      url.searchParams.set('payment_status', 'success');
      window.location.href = url.toString();
    }, 2000);
  };

  const handleCancel = () => {
    const url = new URL(returnUrl, window.location.origin);
    url.searchParams.set('payment_status', 'cancel');
    window.location.href = url.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center border-b bg-[#00a651] text-white rounded-t-xl">
          <CardTitle className="text-2xl font-bold">Telebirr Payment</CardTitle>
          <p className="text-white/80">Secure Payment Gateway (Mock)</p>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">Payment for</p>
            <h3 className="text-xl font-semibold">{subject}</h3>
          </div>
          
          <div className="bg-muted p-4 rounded-lg flex justify-between items-center">
            <span className="text-muted-foreground">Total Amount</span>
            <span className="text-2xl font-bold text-[#00a651]">{amount} ETB</span>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground text-center">
              This is a simulated payment page. No real money will be deducted.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button 
            className="w-full bg-[#00a651] hover:bg-[#008f45] h-12 text-lg" 
            onClick={handlePayment}
            disabled={processing}
          >
            {processing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              'Confirm Payment'
            )}
          </Button>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleCancel}
            disabled={processing}
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MockPayment;
