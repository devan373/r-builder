
import * as React from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import jobRole from '../assets/jobRole.json';
import jobSkills from '../assets/jobSkills.json';
import summaries from '../assets/summaries.json';

import { toast } from 'react-toastify';
import { saveResumeApi } from '../service/apiService';
import { useNavigate } from 'react-router-dom';

const steps = [
  'Basic Information',
  'Contact Details',
  'Educational Details',
  'Review & Submit'
];

function Resumeinput({ resumeDetails, setresumedetails }) {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);
  const [saving, setSaving] = React.useState(false);

  // Update resume details
  const handleChange = (field, value) => {
    setresumedetails((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Move to the next step
  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  // Move to the previous step
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // Check whether the current step is complete
  const isCurrentStepComplete = () => {
    switch (activeStep) {
      case 0:
        return Boolean(
          resumeDetails.fullname?.trim() &&
          resumeDetails.location?.trim() &&
          resumeDetails.job
        );

      case 1:
        return Boolean(
          resumeDetails.email?.trim() &&
          resumeDetails.phone?.trim() &&
          resumeDetails.linkedin?.trim() &&
          resumeDetails.github?.trim()
        );

      case 2:
        return Boolean(
          resumeDetails.degree?.trim() &&
          resumeDetails.college?.trim() &&
          resumeDetails.year
        );

      default:
        return true;
    }
  };

  // Check whether the complete resume is valid
  const isFormComplete = () => {
    const {
      fullname,
      location,
      job,
      phone,
      email,
      github,
      linkedin,
      degree,
      college,
      year,
      skills,
      summary
    } = resumeDetails;

    return Boolean(
      fullname?.trim() &&
      location?.trim() &&
      job &&
      phone?.trim() &&
      email?.trim() &&
      github?.trim() &&
      linkedin?.trim() &&
      degree?.trim() &&
      college?.trim() &&
      year &&
      Array.isArray(skills) &&
      skills.length > 0 &&
      summary?.trim()
    );
  };

  // Generate skills and summary based on the selected job
  const generateSkillSummary = () => {
    if (!resumeDetails.job) {
      toast.warning('Please select a job title first!');
      return;
    }

    const updatedDetails = {
      ...resumeDetails,
      skills: jobSkills[resumeDetails.job] || [],
      summary: summaries[resumeDetails.job] || ''
    };

    if (
      updatedDetails.skills.length === 0 ||
      !updatedDetails.summary.trim()
    ) {
      toast.warning(
        'Skills or summary are unavailable for this job role.'
      );
      return;
    }

    setresumedetails(updatedDetails);
    setActiveStep(steps.length);
  };

  // Save resume to the backend
  const handleSaveResume = async () => {
    if (!isFormComplete()) {
      toast.warning('Please fill in all the required fields!');
      return;
    }

    if (saving) return;

    try {
      setSaving(true);

      const response = await saveResumeApi(resumeDetails);

      console.log('API Response:', response);

      if (response.status === 200 || response.status === 201) {
        toast.success('Resume added successfully!');

        const resumeId = response.data?.id;

        if (resumeId) {
          navigate(`/resume/${resumeId}`);
        } else {
          toast.error(
            'Resume saved, but the server did not return a resume ID.'
          );
        }
      } else {
        toast.error('Unable to save your resume.');
      }
    } catch (error) {
      console.error('Error saving resume:', error);

      toast.error(
        error.response?.data?.message ||
        'Failed to save resume. Please check your server.'
      );
    } finally {
      setSaving(false);
    }
  };

  // Render form fields based on the current step
  const renderFormCount = (stepCount) => {
    switch (stepCount) {
      // Step 1: Basic information
      case 0:
        return (
          <div>
            <h3>Personal Details</h3>

            <div className="row g-3 p-3">
              <div className="col-12">
                <TextField
                  fullWidth
                  value={resumeDetails.fullname || ''}
                  onChange={(e) =>
                    handleChange('fullname', e.target.value)
                  }
                  label="Full Name"
                  variant="standard"
                />
              </div>

              <div className="col-12">
                <TextField
                  fullWidth
                  value={resumeDetails.location || ''}
                  onChange={(e) =>
                    handleChange('location', e.target.value)
                  }
                  label="Location"
                  variant="standard"
                />
              </div>

              <div className="col-12">
                <FormControl fullWidth variant="standard">
                  <InputLabel id="job-role-label">
                    Choose Job Title
                  </InputLabel>

                  <Select
                    labelId="job-role-label"
                    value={resumeDetails.job || ''}
                    onChange={(e) =>
                      handleChange('job', e.target.value)
                    }
                    label="Job"
                  >
                    {jobRole.jobRoles.map((job) => (
                      <MenuItem key={job} value={job}>
                        {job}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        );

      // Step 2: Contact details
      case 1:
        return (
          <div>
            <h3>Contact Details</h3>

            <div className="row g-3 p-3">
              <div className="col-12">
                <TextField
                  fullWidth
                  type="email"
                  value={resumeDetails.email || ''}
                  onChange={(e) =>
                    handleChange('email', e.target.value)
                  }
                  label="Email"
                  variant="standard"
                />
              </div>

              <div className="col-12">
                <TextField
                  fullWidth
                  value={resumeDetails.phone || ''}
                  onChange={(e) =>
                    handleChange('phone', e.target.value)
                  }
                  label="Contact Number"
                  variant="standard"
                />
              </div>

              <div className="col-12">
                <TextField
                  fullWidth
                  value={resumeDetails.linkedin || ''}
                  onChange={(e) =>
                    handleChange('linkedin', e.target.value)
                  }
                  label="LinkedIn Link"
                  variant="standard"
                />
              </div>

              <div className="col-12">
                <TextField
                  fullWidth
                  value={resumeDetails.github || ''}
                  onChange={(e) =>
                    handleChange('github', e.target.value)
                  }
                  label="GitHub Link"
                  variant="standard"
                />
              </div>
            </div>
          </div>
        );

      // Step 3: Educational details
      case 2:
        return (
          <div>
            <h3>Educational Details</h3>

            <div className="row g-3 p-3">
              <div className="col-12">
                <TextField
                  fullWidth
                  value={resumeDetails.degree || ''}
                  onChange={(e) =>
                    handleChange('degree', e.target.value)
                  }
                  label="Bachelor's Degree"
                  variant="standard"
                />
              </div>

              <div className="col-12">
                <TextField
                  fullWidth
                  value={resumeDetails.college || ''}
                  onChange={(e) =>
                    handleChange('college', e.target.value)
                  }
                  label="College"
                  variant="standard"
                />
              </div>

              <div className="col-12">
                <TextField
                  fullWidth
                  value={resumeDetails.year || ''}
                  onChange={(e) =>
                    handleChange('year', e.target.value)
                  }
                  label="Year of Graduation"
                  variant="standard"
                />
              </div>
            </div>
          </div>
        );

      // Step 4: Review and submit
      case 3:
        return (
          <div>
            <h3>Review & Submit</h3>

            <Typography sx={{ mt: 2, mb: 2 }}>
              Your resume details are ready. Generate the suggested
              skills and professional summary before saving.
            </Typography>

            <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
              <Typography>
                <strong>Name:</strong>{' '}
                {resumeDetails.fullname || 'Not provided'}
              </Typography>

              <Typography>
                <strong>Location:</strong>{' '}
                {resumeDetails.location || 'Not provided'}
              </Typography>

              <Typography>
                <strong>Job Role:</strong>{' '}
                {resumeDetails.job || 'Not selected'}
              </Typography>

              <Typography>
                <strong>Email:</strong>{' '}
                {resumeDetails.email || 'Not provided'}
              </Typography>

              <Typography>
                <strong>Degree:</strong>{' '}
                {resumeDetails.degree || 'Not provided'}
              </Typography>
            </Box>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 3, mb: 2 }} variant="h5">
            Resume Ready!
          </Typography>

          <Typography sx={{ mb: 2 }}>
            Your skills and professional summary have been generated.
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">Skills</Typography>

            {Array.isArray(resumeDetails.skills) &&
            resumeDetails.skills.length > 0 ? (
              <ul>
                {resumeDetails.skills.map((skill, index) => (
                  <li key={`${skill}-${index}`}>{skill}</li>
                ))}
              </ul>
            ) : (
              <Typography>No skills generated.</Typography>
            )}

            <Typography variant="h6" sx={{ mt: 2 }}>
              Professional Summary
            </Typography>

            <Typography>
              {resumeDetails.summary || 'No summary generated.'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setActiveStep(3)}
              disabled={saving}
            >
              Back
            </Button>

            <Button
              variant="contained"
              onClick={handleSaveResume}
              disabled={!isFormComplete() || saving}
            >
              {saving ? 'Saving...' : 'FINISH'}
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 3, mb: 2 }}>
            Step {activeStep + 1} of {steps.length}
          </Typography>

          <Box sx={{ mt: 2 }}>
            {renderFormCount(activeStep)}
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              pt: 3
            }}
          >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>

            <Box sx={{ flex: '1 1 auto' }} />

            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={generateSkillSummary}
              >
                Generate Skills & Summary
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  if (isCurrentStepComplete()) {
                    handleNext();
                  } else {
                    toast.warning(
                      'Please complete all fields before continuing.'
                    );
                  }
                }}
              >
                NEXT
              </Button>
            )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

export default Resumeinput;
