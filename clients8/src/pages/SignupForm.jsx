import React from 'react';
import { FormInput } from '../components/auctionSystem/SignInBankOfficer/FormInput';
import { StepIndicator } from '../components/auctionSystem/SignInBankOfficer/StepIndicator';
import styles from '../components/auctionSystem/SignInBankOfficer/SignupForm.module.css';

const formInputs = [
  // { label: "Full Name", placeholder: "Enter your Full Name here", id: "fullName" },
  { label: "Email", placeholder: "Enter your Email here", id: "email", type: "email" },
  { label: "Password", placeholder: "Enter your Password", id: "password", type: "password" },
  { label: "Confirm Password", placeholder: "Confirm your passwords", id: "confirmPassword", type: "password" },
  { label: "Phone Number", placeholder: "Enter your Phone Number", id: "phone", type: "tel" },
  { label: "Address", placeholder: "Enter your Address", id: "address" }
];

export const SignupForm = () => {
  return (
    <div className={styles.signupContainer}>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <div className={styles.imageWrapper}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8aa97536ec69481ef7b5811dfc1a389de2385dc55fd6c9753fdc27d5cf119409?placeholderIfAbsent=true&apiKey=2b64ceff962d4ae184f534c4b0acd108"
              alt="Signup banner"
              className={styles.bannerImage}
            />
            <div className={styles.bannerText}>
              <div className={styles.bannerGrid}>
                <div className={styles.logoText}>s8</div>
                <div className={styles.slogan}>
                  "Unlocking opportunities, one auction at a time –
                  connecting dreams to destinations."
                </div>
              </div>
            </div>
            <div className={styles.stepIndicators}>
              {[true, false, false, false].map((active, index) => (
                <StepIndicator key={index} active={active} />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.formSection}>
          <div className={styles.formWrapper}>
            <h1 className={styles.formTitle}>Create your Free Account</h1>
            
            <div className={styles.userTypeSelector}>
              <div className={styles.userType}>
                <span className={styles.userTypeIcon} />
                <span className={styles.userTypeLabel}>User</span>
              </div>
              <div className={`${styles.userType} ${styles.userTypeActive}`}>
                <span className={styles.userTypeIcon} />
                <span className={styles.userTypeLabel}>Bank Officer</span>
              </div>
            </div>

            <div className={styles.progressSteps}>
              <div className={styles.stepLabel}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/dfa8b815106f2bbb2019ccd69a518bf8e5d31db81421eb6cec2a9f69f6482ad9?placeholderIfAbsent=true&apiKey=2b64ceff962d4ae184f534c4b0acd108"
                  alt="Personal Information icon"
                  className={styles.stepIcon}
                />
                <span className={styles.stepText}>Personal Information</span>
              </div>
              <div className={styles.stepConnector} />
            </div>

            <form className={styles.signupForm}>
              {formInputs.map((input) => (
                <FormInput key={input.id} {...input} />
              ))}
              <button type="submit" className={styles.submitButton}>
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};