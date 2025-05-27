
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { EmploymentDetailsForm } from './forms/EmploymentDetailsForm';
import { IdentificationForm } from './forms/IdentificationForm';
import { BankingPayrollForm } from './forms/BankingPayrollForm';
import { SkillsExperienceForm } from './forms/SkillsExperienceForm';
import { DocumentsForm } from './forms/DocumentsForm';
import { ReviewSubmitForm } from './forms/ReviewSubmitForm';
import { WizardSteps } from './WizardSteps';
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
  { 
    id: 1, 
    title: 'Personal Information', 
    description: 'Basic personal details',
    component: PersonalInfoForm 
  },
  { 
    id: 2, 
    title: 'Employment Details', 
    description: 'Job and employment information',
    component: EmploymentDetailsForm 
  },
  { 
    id: 3, 
    title: 'Identification & Compliance', 
    description: 'ID and compliance documents',
    component: IdentificationForm 
  },
  { 
    id: 4, 
    title: 'Banking & Payroll', 
    description: 'Payment and salary details',
    component: BankingPayrollForm 
  },
  { 
    id: 5, 
    title: 'Skills & Experience', 
    description: 'Professional background',
    component: SkillsExperienceForm 
  },
  { 
    id: 6, 
    title: 'Documents & Attachments', 
    description: 'Required documents upload',
    component: DocumentsForm 
  },
  { 
    id: 7, 
    title: 'Review & Submit', 
    description: 'Final review and submission',
    component: ReviewSubmitForm 
  },
];

export const AddEmployeeWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      employmentType: 'Full time',
      workLocation: 'Main Office',
      documents: {},
    },
    mode: 'onChange',
  });

  const nextStep = async () => {
    const currentStepFields = getStepFields(currentStep);
    const isValid = await form.trigger(currentStepFields);
    
    if (isValid) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps(prev => [...prev, currentStep]);
      }
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (stepNumber: number) => {
    if (stepNumber <= currentStep || completedSteps.includes(stepNumber - 1)) {
      setCurrentStep(stepNumber);
    }
  };

  const saveCurrentStep = async () => {
    setIsSaving(true);
    try {
      const currentStepFields = getStepFields(currentStep);
      const isValid = await form.trigger(currentStepFields);
      
      if (isValid) {
        // Simulate API call to save draft
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (!completedSteps.includes(currentStep)) {
          setCompletedSteps(prev => [...prev, currentStep]);
        }
        
        toast.success(`Step ${currentStep} saved successfully!`);
      } else {
        toast.error('Please fix validation errors before saving.');
      }
    } catch (error) {
      toast.error('Failed to save step. Please try again.');
    } finally {
      setIsSaving(false);
    }
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

  return (
    <div className="w-full space-y-6">
      <WizardSteps 
        steps={steps}
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={goToStep}
      />
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{steps[currentStep - 1].title}</span>
            <span className="text-sm font-normal text-muted-foreground">
              Step {currentStep} of {steps.length}
            </span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {steps[currentStep - 1].description}
          </p>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <CurrentStepComponent form={form} />
              
              <div className="flex justify-between pt-6 border-t">
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={saveCurrentStep}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Draft'}
                  </Button>
                </div>
                
                {currentStep === steps.length ? (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Employee'}
                  </Button>
                ) : (
                  <Button type="button" onClick={nextStep}>
                    Save & Continue
                  </Button>
                )}
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};
