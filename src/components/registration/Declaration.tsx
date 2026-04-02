'use client';

import { useState } from 'react';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface DeclarationProps {
  onAccept: () => void;
}

export function Declaration({ onAccept }: DeclarationProps) {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="space-y-6">
      <CardHeader className="px-0">
        <CardTitle>Declaration and Pledge</CardTitle>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        <div>
          <h3 className="font-semibold">DECLARATION</h3>
          <p className="text-sm text-muted-foreground">I do hereby declare that the contribution is from my personal fund and voluntary by nature.</p>
        </div>
        <div>
          <h3 className="font-semibold">PLEDGE</h3>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li>I believe in integral Humanism which is the basic philosophy of NATIONAL EX SERVICEMEN PARTY.</li>
            <li>I am committed to Nationalism and national Integration, Democracy, and value-based politics.</li>
            <li>I subscribe to the concept of the Secular State and Nation not based on religion.</li>
            <li>I firmly believe that this task can be achieved by peaceful means alone.</li>
            <li>I do not Believe in discrimination based on caste, sex or religion.</li>
            <li>I do not observe or recognize untouchability in any shape or form.</li>
            <li>I am not a member of any other political party.</li>
            <li>I undertake to abide by the Constitution, Rules Discipline of the Party.</li>
          </ul>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="declaration" checked={accepted} onCheckedChange={(checked) => setAccepted(!!checked)} />
          <label htmlFor="declaration" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            I accept the declaration and pledge.
          </label>
        </div>
        <Button onClick={onAccept} className="w-full" disabled={!accepted}>Proceed to Payment</Button>
      </CardContent>
    </div>
  );
}
