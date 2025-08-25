'use client';
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Check, X, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
  submit?: string;
}

interface Touched {
  email?: boolean;
  password?: boolean;
}

export default function LoginPage() {
  const router = useRouter();
  const handleclick = () =>{
    router.push('/signup')
  }
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email' : '';
      case 'password':
        return value.length < 1 ? 'Password is required' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear submit errors when user starts typing
    if (errors.submit) {
      setErrors(prev => ({ ...prev, submit: '' }));
    }
    
    if (touched[name as keyof Touched]) {
      const error = validateField(name as keyof FormData, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof FormData, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };


  function setCookie(name:string, value:string, Remember:boolean) {
    if(Remember){
      localStorage.setItem(name,value);
      sessionStorage.removeItem(name);
      localStorage.setItem('remember',"true");
    }else{
      sessionStorage.setItem(name,value);
      localStorage.removeItem(name);
      localStorage.setItem('remember',"false");
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Errors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key as keyof FormData, formData[key as keyof FormData]);
      if (error) newErrors[key as keyof Errors] = error;
    });
    
    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {} as Touched));
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      try {
        // API call to login user
        const response = await fetch('http://localhost/api/account/login.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (data.success) {
          // Store token if needed
          if(rememberMe){
            setCookie('token',data.code,true)
          }else{
            setCookie('token',data.code,false);
          }
          setIsRedirecting(true); // Show loading overlay
          // Redirect to dashboard or home page
          setTimeout(() => {
            router.replace('/dashboard')
          }, 1000);
        } else {
          setErrors({ submit: data.message || 'Login failed' });
        }
      } catch (error) {
        setErrors({ submit: 'Network error. Please try again.'+error });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Loading overlay for redirect */}
      {isRedirecting && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-2xl flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
            <span className="text-black font-semibold text-lg">Logging in, please wait...</span>
          </div>
        </div>
      )}
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full border border-gray-200">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-black">
            Welcome Back
          </h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Error Display */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-600 text-sm flex items-center">
                <X className="w-4 h-4 mr-2" />
                {errors.submit}
              </p>
            </div>
          )}
          
          {/* Email Field */}
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-semibold text-black mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`text-black w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                  errors.email && touched.email
                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                    : formData.email && !errors.email
                    ? 'border-black focus:border-black bg-gray-100'
                    : 'border-gray-200 focus:border-black bg-gray-100 focus:bg-white'
                } transform focus:scale-105`}
                placeholder="Enter your email"
                autoComplete="email"
              />
              {formData.email && !errors.email && (
                <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
              )}
            </div>
            {errors.email && touched.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <X className="w-4 h-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-semibold text-black mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`text-black w-full pl-10 pr-12 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                  errors.password && touched.password
                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                    : formData.password && !errors.password
                    ? 'border-black focus:border-black bg-gray-100'
                    : 'border-gray-200 focus:border-black bg-gray-100 focus:bg-white'
                } transform focus:scale-105`}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && touched.password && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <X className="w-4 h-4 mr-1" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-5 h-5 border-2 rounded transition-all duration-300 flex items-center justify-center ${
                rememberMe 
                  ? 'bg-black border-black' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}>
                {rememberMe && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-black hover:text-gray-600 transition-colors font-medium"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-black hover:bg-gray-800 hover:scale-105 active:scale-95'
            } shadow-lg hover:shadow-xl`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </button>

          
        </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don&apos;t have an account?{' '}
            <button 
              onClick={handleclick}
              className="text-black hover:text-gray-600 font-semibold transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}