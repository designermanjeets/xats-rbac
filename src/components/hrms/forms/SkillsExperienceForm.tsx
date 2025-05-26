
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface SkillsExperienceFormProps {
  form: UseFormReturn<any>;
}

export const SkillsExperienceForm = ({ form }: SkillsExperienceFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="totalExperience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total Years of Experience</FormLabel>
            <FormControl>
              <Input placeholder="e.g., 5 years" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="md:col-span-1" />

      <FormField
        control={form.control}
        name="primarySkills"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Primary Skills</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="List primary skills separated by commas (e.g., React, TypeScript, Node.js)" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="certifications"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Certifications</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="List certifications and their details" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="educationHistory"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Education History</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Include degree, institution, year of graduation" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="previousEmployers"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Previous Employers</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="List previous employers, positions, and duration" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
