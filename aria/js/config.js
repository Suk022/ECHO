// Configuration 
const CONFIG = {
  BACKEND_URL: window.location.origin.includes('vercel.app') || window.location.origin.includes('echo-psi-eosin') 
    ? 'https://echo-ko7o.onrender.com' 
    : 'http://127.0.0.1:8000'
};
