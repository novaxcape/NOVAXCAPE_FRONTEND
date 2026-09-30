// Pages/AddCentre.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Stepper from '../components/Stepper';
import "../Styles/Addcenter.css";

import BasicInfo from '../components/BasicInfo';
import Facilities from '../components/Facilities';
import Pricing from '../components/Pricing';
import Images from '../components/Images';
import Hours from '../components/Hours';
import Review from '../components/Review';

const defaultOpeningHours = {
  monday: { isOpen: false, openTime: '10 AM', closeTime: '4 PM' },
  tuesday: { isOpen: false, openTime: '10 AM', closeTime: '4 PM' },
  wednesday: { isOpen: false, openTime: '10 AM', closeTime: '4 PM' },
  thursday: { isOpen: false, openTime: '10 AM', closeTime: '4 PM' },
  friday: { isOpen: false, openTime: '10 AM', closeTime: '4 PM' },
  saturday: { isOpen: false, openTime: '10 AM', closeTime: '4 PM' },
  sunday: { isOpen: false, openTime: '10 AM', closeTime: '4 PM' },
};


const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MINIMUM_IMAGES = 3;

const AddCentre = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [centreData, setCentreData] = useState({
    centreName: '',
    location: '',
    description: '',
    city: '',
    state: '',
    streetAddress: '',
  });
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [pricingData, setPricingData] = useState({
    dailySlotCapacity: '',
    installmentPayment: false,
  });
  const [packagesList, setPackagesList] = useState([
    { packageName: '', packageType: '', amount: '', numberOfPeople: '' }
  ]);
  const [uploadedImages, setUploadedImages] = useState({});
  const [documents, setDocuments] = useState({
    termsAndCondition: null,
    privacyPolicy: null,
  });
  const [openingHours, setOpeningHours] = useState(defaultOpeningHours);

  const handleCentreChange = (event) => {
    const { name, value } = event.target;
    setCentreData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePricingChange = (event) => {
    const { name, value, type, checked } = event.target;
    setPricingData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePackagesChange = (packages) => {
    console.log("📦 Packages updated in AddCentre:", packages);
    setPackagesList(packages);
  };

  const handleFacilityToggle = (facility) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((item) => item !== facility)
        : [...prev, facility]
    );
  };

  const handleHoursChange = (day, field, value) => {
    setOpeningHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!centreData.centreName) {
          Swal.fire({ icon: 'error', title: 'Missing Information', text: 'Please enter centre name.', confirmButtonColor: '#ff6b35' });
          return false;
        }
        if (!centreData.city) {
          Swal.fire({ icon: 'error', title: 'Missing Information', text: 'Please enter city.', confirmButtonColor: '#ff6b35' });
          return false;
        }
        if (!centreData.state) {
          Swal.fire({ icon: 'error', title: 'Missing Information', text: 'Please select state.', confirmButtonColor: '#ff6b35' });
          return false;
        }
        if (!centreData.streetAddress) {
          Swal.fire({ icon: 'error', title: 'Missing Information', text: 'Please enter street address.', confirmButtonColor: '#ff6b35' });
          return false;
        }
        if (!centreData.location) {
          Swal.fire({ icon: 'error', title: 'Missing Information', text: 'Please provide location/GPS coordinates.', confirmButtonColor: '#ff6b35' });
          return false;
        }
        if (!centreData.description) {
          Swal.fire({ icon: 'error', title: 'Missing Information', text: 'Please enter description.', confirmButtonColor: '#ff6b35' });
          return false;
        }
        return true;

      case 2:
        if (selectedFacilities.length === 0) {
          Swal.fire({ icon: 'error', title: 'Missing Information', text: 'Please select at least one facility.', confirmButtonColor: '#ff6b35' });
          return false;
        }
        return true;

      case 3: {
        if (!pricingData.dailySlotCapacity) {
          Swal.fire({
            icon: 'error',
            title: 'Missing Information',
            text: 'Please enter daily slot capacity.',
            confirmButtonColor: '#ff6b35'
          });
          return false;
        }

        const validPackages = packagesList.filter(pkg =>
          pkg.packageName?.trim() &&
          pkg.packageType?.trim() &&
          pkg.amount &&
          Number(pkg.amount) > 0 &&
          pkg.numberOfPeople &&
          Number(pkg.numberOfPeople) > 0
        );

        if (validPackages.length === 0) {
          Swal.fire({
            icon: 'error',
            title: 'Missing Package Information',
            text: 'Please add at least one valid package with name, type, amount, and number of people.',
            confirmButtonColor: '#ff6b35'
          });
          return false;
        }

        if (!documents.termsAndCondition || !documents.privacyPolicy) {
          Swal.fire({
            icon: 'error',
            title: 'Missing Documents',
            text: 'Please upload terms and privacy policy documents.',
            confirmButtonColor: '#ff6b35'
          });
          return false;
        }
        return true;
      }

      case 4: {
        const imageFiles = Object.values(uploadedImages).filter((image) => image?.file);
        if (imageFiles.length < MINIMUM_IMAGES) {
          Swal.fire({
            icon: 'error',
            title: 'Missing Images',
            text: `Please upload at least ${MINIMUM_IMAGES} centre images. You have ${imageFiles.length} so far.`,
            confirmButtonColor: '#ff6b35'
          });
          return false;
        }
        const oversized = imageFiles.filter(file => file.size > MAX_FILE_SIZE);
        if (oversized.length > 0) {
          Swal.fire({
            icon: 'error',
            title: 'File Too Large',
            text: 'One or more images exceed the 10MB limit. Please compress your images and try again.',
            confirmButtonColor: '#ff6b35'
          });
          return false;
        }
        return true;
      }

      case 5:
        return true;

      default:
        return true;
    }
  };

  const validateCentre = () => {
    const imageFiles = Object.values(uploadedImages).filter((image) => image?.file);
    const validPackages = packagesList.filter(pkg =>
      pkg.packageName?.trim() &&
      pkg.packageType?.trim() &&
      pkg.amount &&
      Number(pkg.amount) > 0 &&
      pkg.numberOfPeople &&
      Number(pkg.numberOfPeople) > 0
    );

    if (!centreData.centreName || !centreData.description || !centreData.city ||
      !centreData.state || !centreData.streetAddress || !centreData.location) {
      return 'Please complete the basic information fields.';
    }

    if (!selectedFacilities.length) {
      return 'Please select at least one facility.';
    }

    if (!pricingData.dailySlotCapacity) {
      return 'Please add the daily capacity.';
    }

    if (validPackages.length === 0) {
      return 'Please add at least one valid package with name, type, amount, and number of people.';
    }

    if (imageFiles.length < MINIMUM_IMAGES) {
      return `Please upload at least ${MINIMUM_IMAGES} centre images.`;
    }

    const oversized = imageFiles.filter(file => file.size > MAX_FILE_SIZE);
    if (oversized.length > 0) {
      return 'One or more images exceed the 10MB limit. Please compress your images.';
    }

    if (!documents.termsAndCondition) {
      return 'Please upload the Terms and Condition document.';
    }

    if (!documents.privacyPolicy) {
      return 'Please upload the Privacy Policy document.';
    }

    return '';
  };

  const handleSubmit = async () => {
    const validationError = validateCentre();
    if (validationError) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: validationError,
        confirmButtonColor: '#ff6b35',
      });
      return;
    }

    // UI-only build: nothing is submitted. Confirm and continue to the KYC step.
    await Swal.fire({
      icon: 'success',
      title: 'Centre Created!',
      text: 'Next: complete KYC verification to activate your centre.',
      confirmButtonColor: '#ff6b35',
      confirmButtonText: 'Continue to KYC',
    });

    navigate('/kyc', {
      replace: true,
      state: { touristId: 'sample-1', centreName: centreData.centreName },
    });
  };
  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < 6) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/vendor/dashboard');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfo formData={centreData} onChange={handleCentreChange} />;
      case 2:
        return (
          <Facilities
            selectedFacilities={selectedFacilities}
            onToggle={handleFacilityToggle}
          />
        );
      case 3:
        return (
          <Pricing
            formData={pricingData}
            onChange={handlePricingChange}
            onPackagesChange={handlePackagesChange}
            onDocumentsChange={setDocuments}
            documents={documents}
          />
        );
      case 4:
        return (
          <Images
            uploadedImages={uploadedImages}
            onImagesChange={setUploadedImages}
          />
        );
      case 5:
        return <Hours openingHours={openingHours} onChange={handleHoursChange} />;
      case 6:
        return (
          <Review
            centreData={centreData}
            pricingData={pricingData}
            selectedFacilities={selectedFacilities}
            uploadedImages={uploadedImages}
            documents={documents}
            openingHours={openingHours}
            packagesList={packagesList}
          />
        );
      default:
        return <BasicInfo formData={centreData} onChange={handleCentreChange} />;
    }
  };

  const getStepTitle = () => {
    const titles = [
      'Basic Information',
      'Facilities & Amenities',
      'Pricing & Tickets',
      'Images & Media',
      'Operating Hours',
      'Review & Submit'
    ];
    return titles[currentStep - 1];
  };

  return (
    <div className="app-container">
      <Navbar />

      <div className="main-content">
        {currentStep > 1 && (
          <button
            className="btn-back"
            onClick={handleBack}
                        style={{
              fontSize: "12px",
              padding: "6px 16px",
              width: "auto",
              minWidth: "70px",
              backgroundColor: "#ff5e3a",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              marginTop: "20px",
              marginBottom: "25px",
              color: "white",
              transition: "all 0.3s ease",
              fontWeight: "600",
              display: "inline-block"
            }}
          >
            ← Back
          </button>
        )}

        <h1>Add New Tourism Centre</h1>
        <p className="subtitle">
          Fill in the details to list your tourism centre on NovaEscape
        </p>

        <Stepper currentStep={currentStep} />

        <div className="form-card">
          <div className="step-header">
            <h2 className="card-title">{getStepTitle()}</h2>
            {currentStep === 2 && (
              <p className="card-subtitle">
                Add the basic details customers will see for your centre
              </p>
            )}
            {currentStep === 3 && (
              <p className="card-subtitle">
                Select all the facilities and amenities available at your centre
              </p>
            )}
            {currentStep === 5 && (
              <p className="card-subtitle">
                Upload high-quality images of your tourism centre (minimum {MINIMUM_IMAGES} images required)
              </p>
            )}
          </div>

          {renderStepContent()}

          <div className="form-actions">
            <button
              className="btn-next"
              onClick={handleNext}
                          >
              {currentStep === 6 ? 'Submit Centre' : 'Next'}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AddCentre;
