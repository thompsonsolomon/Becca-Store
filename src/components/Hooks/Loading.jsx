import '../Styles/Loading.css';

export const LoadingProduct = () => {
  return (
    <div className="loading-product">
      <div className="loading-image"></div>
      <div className="loading-details">
        <div className="loading-line short"></div>
        <div className="loading-meta">
          <div className="loading-line tiny"></div>
          <span className="loading-dot"></span>
          <div className="loading-line small"></div>
        </div>
      </div>
      <div className="loading-footer">
        <div className="loading-line medium"></div>
        <div className="loading-circle"></div>
      </div>
      <div className="loading-button"></div>
    </div>
  );
};
