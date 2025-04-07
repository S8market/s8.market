import "./breadcrumb.scss";
import PropTypes from "prop-types";

const Breadcrumb = ({ step, setStep }) => {
  return (
    <div className="breadcrumbContainer">
      <div className="breadcrumb">
        <div
          className={`breadcrumbItem ${step >= 1 ? "active" : ""}`}
          onClick={() => setStep(1)}
        >
          Property Details
        </div>
        <img
          src="/arrow(right).svg"
          alt=">"
          className={`breadcrumbArrow ${step >= 2 ? "active" : ""}`}
        />
        <div
          className={`breadcrumbItem ${step >= 2 ? "active" : ""}`}
          onClick={() => setStep(2)}
        >
          Address Details
        </div>
        <img
          src="/arrow(right).svg"
          alt=">"
          className={`breadcrumbArrow ${step >= 3 ? "active" : ""}`}
        />
        <div
          className={`breadcrumbItem ${step >= 3 ? "active" : ""}`}
          onClick={() => setStep(3)}
        >
          Auction Details
        </div>
      </div>
      <div className="progressLine">
        <div className={`progressFill step-${step}`}></div>
      </div>
    </div>
  );
};

Breadcrumb.propTypes = {
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
};

export default Breadcrumb;
