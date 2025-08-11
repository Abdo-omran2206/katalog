'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  submit?: string;
}

interface Touched {
  name?: boolean;
  email?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
  gender?: boolean;
}

export default function RegisterPage() {
  const router = useRouter()

  const handleclick = () =>{
    router.push('/login')
  }

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email' : '';
      case 'password':
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) 
          return 'Password must contain uppercase, lowercase, and number';
        return '';
      case 'confirmPassword':
        return value !== formData.password ? 'Passwords do not match' : '';
      case 'gender':
        return !value ? 'Please select a gender' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
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

  const getPasswordStrength = (password: string): number => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;
    return score;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthColors = ['bg-red-500', 'bg-red-400', 'bg-yellow-500', 'bg-gray-600', 'bg-black'];
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  
  function setCookie(name:string, value:string, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString(); // 864e5 = 86400000 ms = 1 day
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
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
        // API call to register user
        const response = await fetch('http://localhost/api/account/signup.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            gender: formData.gender
          }),
        });
        const data = await response.json()
        if (data.success) {
          setIsSuccess(true);
          setCookie('token',data.data.random_code)
          // Reset form after success
          setTimeout(() => {
            router.replace('/dashboard')
          }, 3000);
        } else {
          setErrors({ submit: data.message || 'Registration failed' });
        }
      } catch (error) {
        setErrors({ submit: 'Network error. Please try again.' });
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center transform animate-pulse border border-gray-200">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">Welcome aboard!</h2>
          <p className="text-gray-600">Your account has been created successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full border border-gray-200">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-black">
            Create Account
          </h1>
          <p className="text-gray-600 mt-2">Join us and start your journey</p>
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

          {/* Name Field */}
          
          <div className="relative">
            <label htmlFor="name" className="block text-sm font-semibold text-black mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`text-black w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                  errors.name && touched.name
                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                    : formData.name && !errors.name
                    ? 'border-black focus:border-black bg-gray-100'
                    : 'border-gray-200 focus:border-black bg-gray-100 focus:bg-white'
                } transform focus:scale-105`}
                placeholder="Enter your full name"
              />
              {formData.name && !errors.name && (
                <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
              )}
            </div>
            {errors.name && touched.name && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <X className="w-4 h-4 mr-1" />
                {errors.name}
              </p>
            )}
          </div>

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
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex space-x-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i < passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-gray-200'
                      } ${i === 0 ? 'w-5' : i === 1 ? 'w-6' : i === 2 ? 'w-7' : i === 3 ? 'w-8' : 'w-9'}`}
                    />
                  ))}
                </div>
                <p className={`text-xs ${passwordStrength >= 4 ? 'text-black' : passwordStrength >= 3 ? 'text-gray-600' : passwordStrength >= 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                  Strength: {strengthLabels[passwordStrength - 1] || 'Too short'}
                </p>
              </div>
            )}
            
            {errors.password && touched.password && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <X className="w-4 h-4 mr-1" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-black mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`text-black w-full pl-10 pr-12 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                  errors.confirmPassword && touched.confirmPassword
                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                    : formData.confirmPassword && !errors.confirmPassword && formData.confirmPassword === formData.password
                    ? 'border-black focus:border-black bg-gray-100'
                    : 'border-gray-200 focus:border-black bg-gray-100 focus:bg-white'
                } transform focus:scale-105`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <X className="w-4 h-4 mr-1" />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Gender Selection */}
          <div className="relative">
            <label className="block text-sm font-semibold text-black mb-3">Gender</label>
            <div className="grid grid-cols-2 gap-3">
              {['male', 'female'].map((gender) => (
                <label
                  key={gender}
                  className={`text-black relative flex items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    formData.gender === gender
                      ? 'border-black bg-gray-100 text-black'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className="font-medium capitalize">{gender}</span>
                  {formData.gender === gender && (
                    <Check className="absolute right-2 w-4 h-4 text-black" />
                  )}
                </label>
              ))}
            </div>
            {errors.gender && touched.gender && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <X className="w-4 h-4 mr-1" />
                {errors.gender}
              </p>
            )}
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
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
          
        </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <button className="text-black hover:text-gray-600 font-semibold transition-colors" onClick={handleclick}>
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}