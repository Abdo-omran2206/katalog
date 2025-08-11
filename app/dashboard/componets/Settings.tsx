"use client";
import { useState } from "react";
import { User, Bell, Shield, Lock, Mail, Phone, Globe, Palette, Download, Trash2, Edit } from 'lucide-react';

interface UserSettings {
    name: string;
    email: string;
    phone: string;
    language: string;
    theme: 'light' | 'dark' | 'auto';
    notifications: {
        email: boolean;
        sms: boolean;
        push: boolean;
        checkInReminders: boolean;
        inactivityWarnings: boolean;
    };
    security: {
        twoFactorAuth: boolean;
        sessionTimeout: number;
        autoLogout: boolean;
    };
}

function Settings() {
    const [settings, setSettings] = useState<UserSettings>({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1234567890",
        language: "English",
        theme: "light",
        notifications: {
            email: true,
            sms: true,
            push: true,
            checkInReminders: true,
            inactivityWarnings: true,
        },
        security: {
            twoFactorAuth: false,
            sessionTimeout: 30,
            autoLogout: true,
        }
    });

    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleNotificationChange = (key: keyof typeof settings.notifications) => {
        setSettings({
            ...settings,
            notifications: {
                ...settings.notifications,
                [key]: !settings.notifications[key]
            }
        });
    };

    const handleSecurityChange = (key: keyof typeof settings.security, value: boolean | number) => {
        setSettings({
            ...settings,
            security: {
                ...settings.security,
                [key]: value
            }
        });
    };

    const saveSettings = () => {
        setIsEditing(false);
        // Here you would typically save to backend
    };

    const exportData = () => {
        // Export user data functionality
        console.log("Exporting data...");
    };

    const deleteAccount = () => {
        // Account deletion functionality
        console.log("Deleting account...");
    };

    return (
        <div className="space-y-6">
            {/* Account Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
                        <p className="text-gray-600">Manage your account information and preferences</p>
                    </div>
                    {!isEditing && (
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 bg-[#ced7de] text-black px-4 py-2 rounded-md hover:bg-[#b8c5cc] transition-colors duration-200"
                        >
                            <Edit size={16} />
                            Edit Settings
                        </button>
                    )}
                </div>

                {!isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                                    <User size={20} className="text-gray-400" />
                                    <span className="text-gray-900">{settings.name}</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                                    <Mail size={20} className="text-gray-400" />
                                    <span className="text-gray-900">{settings.email}</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                                    <Phone size={20} className="text-gray-400" />
                                    <span className="text-gray-900">{settings.phone}</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                                    <Globe size={20} className="text-gray-400" />
                                    <span className="text-gray-900">{settings.language}</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                                    <Palette size={20} className="text-gray-400" />
                                    <span className="text-gray-900 capitalize">{settings.theme}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={settings.name}
                                        onChange={(e) => setSettings({...settings, name: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={settings.email}
                                        onChange={(e) => setSettings({...settings, email: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={settings.phone}
                                        onChange={(e) => setSettings({...settings, phone: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                                    <select
                                        value={settings.language}
                                        onChange={(e) => setSettings({...settings, language: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="English">English</option>
                                        <option value="Spanish">Spanish</option>
                                        <option value="French">French</option>
                                        <option value="German">German</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                                    <select
                                        value={settings.theme}
                                        onChange={(e) => setSettings({...settings, theme: e.target.value as 'light' | 'dark' | 'auto'})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                        <option value="auto">Auto</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button 
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={saveSettings}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Bell className="text-blue-600" size={24} />
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Notification Preferences</h2>
                        <p className="text-gray-600">Choose how you want to be notified</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                            <h3 className="font-medium text-gray-900">Email Notifications</h3>
                            <p className="text-sm text-gray-600">Receive notifications via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notifications.email}
                                onChange={() => handleNotificationChange('email')}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                            <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                            <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notifications.sms}
                                onChange={() => handleNotificationChange('sms')}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                            <h3 className="font-medium text-gray-900">Check-in Reminders</h3>
                            <p className="text-sm text-gray-600">Get reminded to check in regularly</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notifications.checkInReminders}
                                onChange={() => handleNotificationChange('checkInReminders')}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                            <h3 className="font-medium text-gray-900">Inactivity Warnings</h3>
                            <p className="text-sm text-gray-600">Get warned before becoming inactive</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notifications.inactivityWarnings}
                                onChange={() => handleNotificationChange('inactivityWarnings')}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Shield className="text-green-600" size={24} />
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Security Settings</h2>
                        <p className="text-gray-600">Manage your account security</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                            <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.security.twoFactorAuth}
                                onChange={() => handleSecurityChange('twoFactorAuth', !settings.security.twoFactorAuth)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                            <h3 className="font-medium text-gray-900">Auto Logout</h3>
                            <p className="text-sm text-gray-600">Automatically log out after inactivity</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.security.autoLogout}
                                onChange={() => handleSecurityChange('autoLogout', !settings.security.autoLogout)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="font-medium text-gray-900">Session Timeout</h3>
                                <p className="text-sm text-gray-600">Set how long before automatic logout (minutes)</p>
                            </div>
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="120"
                            step="5"
                            value={settings.security.sessionTimeout}
                            onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                            <span>5 min</span>
                            <span>{settings.security.sessionTimeout} min</span>
                            <span>120 min</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Management */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Download className="text-purple-600" size={24} />
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Data Management</h2>
                        <p className="text-gray-600">Manage your data and account</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                            <h3 className="font-medium text-gray-900">Export Data</h3>
                            <p className="text-sm text-gray-600">Download all your data and messages</p>
                        </div>
                        <button 
                            onClick={exportData}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                        >
                            Export
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                        <div>
                            <h3 className="font-medium text-red-900">Delete Account</h3>
                            <p className="text-sm text-red-700">Permanently delete your account and all data</p>
                        </div>
                        <button 
                            onClick={deleteAccount}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            <Trash2 size={16} className="inline mr-2" />
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;