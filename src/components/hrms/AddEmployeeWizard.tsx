
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { EmploymentDetailsForm } from './forms/EmploymentDetailsForm';
import { IdentificationForm } from './forms/IdentificationForm';
import { BankingPayrollForm } from './forms/BankingPayrollForm';
import { SkillsExperienceForm } from './forms/SkillsExperienceForm';
import { DocumentsForm } from './forms/DocumentsForm';
import { ReviewSubmitForm } from './forms/ReviewSubmitForm';
import { toast } from 'sonner';

const employeeSchema = z.object({
  // Personal Information
  employmentType: z.enum(['Full time', 'Contractor']),
  fullName: z.string().min(1, 'Full name is required'),
  gender: z.string().optional(),
  dateOfBirth: z.date({ required_error: 'Date of birth is required' }),
  nationality: z.string().min(1, 'Nationality is required'),
  maritalStatus: z.string().optional(),
  phoneNumbers: z.string().min(1, 'Phone number is required'),
  emailAddress: z.string().email('Valid email is required'),
  currentAddress: z.string().min(1, 'Current address is required'),
  permanentAddress: z.string().min(1, 'Permanent address is required'),
  emergencyContactName: z.string().min(1, 'Emergency contact name is required'),
  emergencyContactPhone: z.string().min(1, 'Emergency contact phone is required'),
  emergencyContactRelationship: z.string().optional(),

  // Employment Details
  employeeId: z.string().min(1, 'Employee ID is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  department: z.string().min(1, 'Department is required'),
  reportingManager: z.string().min(1, 'Reporting manager is required'),
  dateOfJoining: z.date({ required_error: 'Date of joining is required' }),
  workLocation: z.string().min(1, 'Work location is required'),
  employmentStatus: z.string().min(1, 'Employment status is required'),
  probationEndDate: z.date().optional(),
  contractStartDate: z.date().optional(),
  contractEndDate: z.date().optional(),
  sourceOfHire: z.string().optional(),

  // Identification & Compliance
  taxIdType: z.string().min(1, 'Tax ID type is required'),
  taxIdNumber: z.string().min(1, 'Tax ID number is required'),
  passportNumber: z.string().optional(),
  visaType: z.string().optional(),
  visaStatus: z.string().optional(),
  workAuthExpiry: z.date().optional(),
  backgroundCheckStatus: z.string().optional(),
  drugTestClearance: z.string().optional(),
  taxFormsSubmitted: z.string().optional(),

  // Banking & Payroll
  bankAccountNumber: z.string().optional(),
  bankName: z.string().optional(),
  routingNumber: z.string().optional(),
  paymentMode: z.string().optional(),
  salaryPayRate: z.string().optional(),
  payFrequency: z.string().optional(),

  // Skills and Experience
  totalExperience: z.string().optional(),
  primarySkills: z.string().optional(),
  certifications: z.string().optional(),
  educationHistory: z.string().optional(),
  previousEmployers: z.string().optional(),

  // Documents (file names/paths would be stored)
  documents: z.object({
    resume: z.string().optional(),
    offerLetter: z.string().optional(),
    employmentAgreement: z.string().optional(),
    workAuthProof: z.string().optional(),
    idProof: z.string().optional(),
  }).optional(),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

const steps = [
  { id: 1, title: 'Personal Information', component: PersonalInfoForm },
  { id: 2, title: 'Employment Details', component: EmploymentDetailsForm },
  { id: 3, title: 'Identification & Compliance', component: IdentificationForm },
  { id: 4, title: 'Banking & Payroll', component: BankingPayrollForm },
  { id: 5, title: 'Skills & Experience', component: SkillsExperienceForm },
  { id: 6, title: 'Documents & Attachments', component: DocumentsForm },
  { id: 7, title: 'Review & Submit', component: ReviewSubmitForm },
];

export const AddEmployeeWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      employmentType: 'Full time',
      workLocation: 'Main Office', // Default value
      documents: {},
    },
  });

  const nextStep = async () => {
    const currentStepFields = getStepFields(currentStep);
    const isValid = await form.trigger(currentStepFields);
    
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: EmployeeFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Employee data:', data);
      toast.success('Employee added successfully!');
      // Navigate back to dashboard or employees list
    } catch (error) {
      toast.error('Failed to add employee. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepFields = (step: number): (keyof EmployeeFormData)[] => {
    switch (step) {
      case 1:
        return ['fullName', 'dateOfBirth', 'nationality', 'phoneNumbers', 'emailAddress', 'currentAddress', 'permanentAddress', 'emergencyContactName', 'emergencyContactPhone'];
      case 2:
        return ['employeeId', 'jobTitle', 'department', 'reportingManager', 'dateOfJoining', 'workLocation', 'employmentStatus'];
      case 3:
        return ['taxIdType', 'taxIdNumber'];
      case 4:
        return [];
      case 5:
        return [];
      case 6:
        return [];
      case 7:
        return [];
      default:
        return [];
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;
  const progress = (currentStep / steps.length) * 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}</span>
          <span className="text-sm font-normal text-muted-foreground">{Math.round(progress)}% Complete</span>
        </CardTitle>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CurrentStepComponent form={form} />
          
          <div className="flex justify-between pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep === steps.length ? (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Employee'}
              </Button>
            ) : (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
