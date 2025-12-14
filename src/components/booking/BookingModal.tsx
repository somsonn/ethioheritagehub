import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { initializeTelebirrPayment } from '@/lib/telebirr';
import { toast } from 'sonner';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerName: string;
  pricePerUnit: number;
  unitName: string; // e.g., "night", "person", "trip"
}

export function BookingModal({ isOpen, onClose, providerName, pricePerUnit, unitName }: BookingModalProps) {
  const [date, setDate] = useState<Date>();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const totalAmount = pricePerUnit * quantity;

  const handlePayment = async () => {
    if (!date) {
      toast.error('Please select a date');
      return;
    }

    setLoading(true);
    try {
      // In a real app, you would get user details from the auth context
      const paymentData = {
        amount: totalAmount,
        currency: 'ETB',
        subject: `Booking for ${providerName}`,
        transactionId: `tx-${Date.now()}`,
      };

      const response = await initializeTelebirrPayment(paymentData);

      if (response.status === 'success') {
        toast.success('Payment initialized! Redirecting to Telebirr...');
        // Redirect to the mock payment page
        window.location.href = response.data.checkout_url;
      }
    } catch (error) {
      toast.error('Failed to initialize payment');
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book {providerName}</DialogTitle>
          <DialogDescription>
            Complete your booking details below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-2">
            <Label>Number of {unitName}s</Label>
            <Input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
          </div>
          
          <div className="bg-muted p-4 rounded-lg mt-2">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Price per {unitName}</span>
              <span className="font-medium">{pricePerUnit} ETB</span>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2">
              <span className="font-bold">Total</span>
              <span className="font-bold text-primary">{totalAmount} ETB</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handlePayment} disabled={loading} className="w-full bg-[#00a651] hover:bg-[#008f45]">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Pay with Telebirr'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
