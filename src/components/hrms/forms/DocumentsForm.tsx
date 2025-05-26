
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { FileUpload } from '@/components/ui/file-upload';

interface DocumentsFormProps {
  form: UseFormReturn<any>;
}

export const DocumentsForm = ({ form }: DocumentsFormProps) => {
  const employmentType = form.watch('employmentType');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="documents.resume"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Resume {employmentType && '*'}</FormLabel>
            <FormControl>
              <FileUpload
                value={field.value}
                onChange={field.onChange}
                accept=".pdf,.doc,.docx"
                placeholder="Upload resume"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="documents.offerLetter"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Offer Letter *</FormLabel>
            <FormControl>
              <FileUpload
                value={field.value}
                onChange={field.onChange}
                accept=".pdf,.doc,.docx"
                placeholder="Upload offer letter"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="documents.employmentAgreement"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Employment Agreement *</FormLabel>
            <FormControl>
              <FileUpload
                value={field.value}
                onChange={field.onChange}
                accept=".pdf,.doc,.docx"
                placeholder="Upload employment agreement"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="documents.workAuthProof"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Work Authorization Proof</FormLabel>
            <FormControl>
              <FileUpload
                value={field.value}
                onChange={field.onChange}
                accept=".pdf,.jpg,.jpeg,.png"
                placeholder="Upload work authorization proof"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="documents.idProof"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ID Proof</FormLabel>
            <FormControl>
              <FileUpload
                value={field.value}
                onChange={field.onChange}
                accept=".pdf,.jpg,.jpeg,.png"
                placeholder="Upload ID proof"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
