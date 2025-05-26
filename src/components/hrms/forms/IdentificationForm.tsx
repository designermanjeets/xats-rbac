
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface IdentificationFormProps {
  form: UseFormReturn<any>;
}

export const IdentificationForm = ({ form }: IdentificationFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="taxIdType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Government Tax ID Type *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select tax ID type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="SSN">SSN (Social Security Number)</SelectItem>
                <SelectItem value="ITIN">ITIN (Individual Taxpayer Identification Number)</SelectItem>
                <SelectItem value="EIN">EIN (Employer Identification Number)</SelectItem>
                <SelectItem value="Aadhar">Aadhar Number</SelectItem>
                <SelectItem value="PAN">PAN Card</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="taxIdNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tax ID Number *</FormLabel>
            <FormControl>
              <Input placeholder="Enter tax ID number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="passportNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Passport Number</FormLabel>
            <FormControl>
              <Input placeholder="Enter passport number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="visaType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Visa Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select visa type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="H1B">H1B</SelectItem>
                <SelectItem value="L1">L1</SelectItem>
                <SelectItem value="F1">F1</SelectItem>
                <SelectItem value="J1">J1</SelectItem>
                <SelectItem value="O1">O1</SelectItem>
                <SelectItem value="Green Card">Green Card</SelectItem>
                <SelectItem value="Citizen">US Citizen</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="visaStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Visa Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select visa status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
                <SelectItem value="Renewal In Progress">Renewal In Progress</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="workAuthExpiry"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Work Authorization Expiry</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="backgroundCheckStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Background Check Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Not Required">Not Required</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="drugTestClearance"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Drug Test Clearance</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Cleared">Cleared</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Not Required">Not Required</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="taxFormsSubmitted"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tax Forms Submitted</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="W-4 Submitted">W-4 Submitted</SelectItem>
                <SelectItem value="W-9 Submitted">W-9 Submitted</SelectItem>
                <SelectItem value="I-9 Submitted">I-9 Submitted</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Not Required">Not Required</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
