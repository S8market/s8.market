import PropTypes from "prop-types";
import "./singleHeader.scss";

const SingleHeader = ({ pageName, title }) => {
  return (
    <div className="header">
      <div className="header-content">
        <div className="breadcrumbs">
          <span className="page-name">{pageName}</span>
          <span className="separator">&gt; </span>
          <span className="title">{title}</span>
        </div>
        <div className="sub-title">Showing {title}</div>
      </div>
    </div>
  );
};

export default SingleHeader;

SingleHeader.propTypes = {
  pageName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
