import { useState } from 'react';
import { MovingBorder } from './ui/moving-border';
import { Button } from './ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface SkipComparisonProps {
  itemName: string;
  initialWeight: number;
  onSubmit: (data: { weight: number; notes: string }) => void;
}

export function SkipComparisonComponent({
  itemName,
  initialWeight,
  onSubmit,
}: SkipComparisonProps) {
  const [weight, setWeight] = useState(initialWeight);
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    onSubmit({ weight, notes });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Compare Skip: {itemName}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Skip Comparison: {itemName}</DrawerTitle>
            <DrawerDescription>
              Record weight details and any notes for this skip.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="weight">Weight (tons)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={e => setWeight(Number(e.target.value))}
                  placeholder="Enter weight in tons"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Add any additional notes"
                />
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={handleSubmit}>Submit Comparison</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
