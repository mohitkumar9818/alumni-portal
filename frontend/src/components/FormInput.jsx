const FormInput = ({ label, error, type, ...props }) => {
    // Add autocomplete for password fields
    const autocomplete = type === 'password' ? 'current-password' : 'off'

    return (
        <div className="form-group">
            {label && <label>{label}</label>}
            <input
                type={type}
                autoComplete={autocomplete}
                {...props}
                className={`form-input ${error ? 'error' : ''}`}
            />
            {error && <span className="error-text">{error}</span>}
        </div>
    )
}

export default FormInput
