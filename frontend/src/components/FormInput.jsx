const FormInput = ({ label, error, ...props }) => {
    return (
        <div className="form-group">
            {label && <label>{label}</label>}
            <input {...props} className={`form-input ${error ? 'error' : ''}`} />
            {error && <span className="error-text">{error}</span>}
        </div>
    )
}

export default FormInput
