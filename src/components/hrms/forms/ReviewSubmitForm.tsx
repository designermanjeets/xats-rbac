
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface ReviewSubmitFormProps {
  form: UseFormReturn<any>;
}

export const ReviewSubmitForm = ({ form }: ReviewSubmitFormProps) => {
  const formData = form.getValues();

  const sections = [
    {
      title: 'Personal Information',
      fields: [
        { label: 'Employment Type', value: formData.employmentType },
        { label: 'Full Name', value: formData.fullName },
        { label: 'Gender', value: formData.gender },
        { label: 'Date of Birth', value: formData.dateOfBirth ? format(formData.dateOfBirth, 'PPP') : '' },
        { label: 'Nationality', value: formData.nationality },
        { label: 'Marital Status', value: formData.maritalStatus },
        { label: 'Phone Number', value: formData.phoneNumbers },
        { label: 'Email Address', value: formData.emailAddress },
        { label: 'Current Address', value: formData.currentAddress },
        { label: 'Permanent Address', value: formData.permanentAddress },
        { label: 'Emergency Contact', value: `${formData.emergencyContactName} (${formData.emergencyContactPhone})` },
      ],
    },
    {
      title: 'Employment Details',
      fields: [
        { label: 'Employee ID', value: formData.employeeId },
        { label: 'Job Title', value: formData.jobTitle },
        { label: 'Department', value: formData.department },
        { label: 'Reporting Manager', value: formData.reportingManager },
        { label: 'Date of Joining', value: formData.dateOfJoining ? format(formData.dateOfJoining, 'PPP') : '' },
        { label: 'Work Location', value: formData.workLocation },
        { label: 'Employment Status', value: formData.employmentStatus },
      ],
    },
    {
      title: 'Identification & Compliance',
      fields: [
        { label: 'Tax ID Type', value: formData.taxIdType },
        { label: 'Tax ID Number', value: formData.taxIdNumber },
        { label: 'Passport Number', value: formData.passportNumber },
        { label: 'Visa Type', value: formData.visaType },
        { label: 'Visa Status', value: formData.visaStatus },
      ],
    },
    {
      title: 'Banking & Payroll',
      fields: [
        { label: 'Payment Mode', value: formData.paymentMode },
        { label: 'Salary/Pay Rate', value: formData.salaryPayRate },
        { label: 'Pay Frequency', value: formData.payFrequency },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Review Employee Information</h3>
        <p className="text-sm text-gray-600">Please review all information before submitting</p>
      </div>

      {sections.map((section, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-base">{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields.map((field, fieldIndex) => (
                field.value && (
                  <div key={fieldIndex} className="space-y-1">
                    <label className="text-sm font-medium text-gray-600">{field.label}</label>
                    <div className="text-sm text-gray-900">
                      {typeof field.value === 'string' ? (
                        field.value.length > 50 ? (
                          <p className="break-words">{field.value}</p>
                        ) : (
                          <Badge variant="outline">{field.value}</Badge>
                        )
                      ) : (
                        <Badge variant="outline">{String(field.value)}</Badge>
                      )}
                    </div>
                  </div>
                )
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {formData.documents && Object.values(formData.documents).some(Boolean) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Documents Uploaded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(formData.documents).map(([key, value]) => (
                value && (
                  <div key={key} className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Badge>
                    <span className="text-sm text-gray-600">Uploaded</span>
                  </div>
                )
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
