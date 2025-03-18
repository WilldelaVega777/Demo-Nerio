//--------------------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------------------
import { FC, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import '../Login/Login.css';

//--------------------------------------------------------------------------------------
// Props Interface Section
//--------------------------------------------------------------------------------------
interface SignupProps {
  // Define props here (if any)
}

//--------------------------------------------------------------------------------------
// Page Main Function Section
//--------------------------------------------------------------------------------------
const Signup: FC<SignupProps> = ({ /* props */ }) => {
  //--------------------------------------------------------------------------------------
  // Hooks Section
  //--------------------------------------------------------------------------------------
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { isAuthenticated, signup } = useAuth();

  //--------------------------------------------------------------------------------------
  // Functions Section
  //--------------------------------------------------------------------------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    signup({
      email: username,
      password: password,
      licenseKey: '' // Since we're not collecting licenseKey in this form
    }).then(success => {
      if (success) {
        setError('');
      } else {
        setError('Error creating account');
      }
    });
  };

  //--------------------------------------------------------------------------------------
  // JSX Section
  //--------------------------------------------------------------------------------------
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Sign Up</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
        </div>
        <button type="submit">Sign Up</button>
        <div className="auth-links">
          <Link to="/login">Already have an account? Sign in</Link>
        </div>
      </form>
    </div>
  );
};

//--------------------------------------------------------------------------------------
// Exports Section
//--------------------------------------------------------------------------------------
export default Signup;