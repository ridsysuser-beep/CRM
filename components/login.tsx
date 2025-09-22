import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Network, Eye, EyeOff } from "lucide-react";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load saved credentials on component mount
  useEffect(() => {
    const savedCredentials = localStorage.getItem("isp-login-credentials");
    if (savedCredentials) {
      try {
        const { username: savedUsername, password: savedPassword, rememberMe: savedRemember } = JSON.parse(savedCredentials);
        if (savedRemember) {
          setUsername(savedUsername);
          setPassword(savedPassword || "");
          setRememberMe(true);
        }
      } catch (error) {
        // Clear invalid stored data
        localStorage.removeItem("isp-login-credentials");
      }
    }
  }, []);

  // Handle remember me checkbox change
  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked);
    
    if (checked) {
      // If checking remember me and we have saved credentials, auto-fill them
      const savedCredentials = localStorage.getItem("isp-login-credentials");
      if (savedCredentials) {
        try {
          const { username: savedUsername, password: savedPassword } = JSON.parse(savedCredentials);
          if (savedUsername) setUsername(savedUsername);
          if (savedPassword) setPassword(savedPassword);
        } catch (error) {
          localStorage.removeItem("isp-login-credentials");
        }
      }
    } else {
      // If unchecking, clear saved data
      localStorage.removeItem("isp-login-credentials");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Save credentials if remember me is checked
    // Note: Storing passwords in localStorage is not recommended for production apps
    // This is for demo/prototype purposes only
    if (rememberMe) {
      localStorage.setItem("isp-login-credentials", JSON.stringify({
        username,
        password, // Store password for demo purposes only
        rememberMe: true,
        savedAt: new Date().toISOString()
      }));
    } else {
      localStorage.removeItem("isp-login-credentials");
    }
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-[400px]">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1447E6] to-[#0F3BC4] rounded-2xl mb-4 shadow-lg">
            <Network className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">ISP Operator Portal</h1>
          <p className="text-gray-600">Sign in to access your dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Login Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 text-[24px]">Login</h2>
            <p className="text-sm text-gray-600 mt-1">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1447E6] focus:border-[#1447E6] transition-all duration-200"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1447E6] focus:border-[#1447E6] transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-3">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={handleRememberMeChange}
                className="border-gray-300 data-[state=checked]:bg-[#1447E6] data-[state=checked]:border-[#1447E6]"
              />
              <Label 
                htmlFor="remember" 
                className="text-sm text-gray-600 cursor-pointer"
              >
                Remember me for 30 days
              </Label>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full bg-[#1447E6] hover:bg-[#0F3BC4] text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <button className="text-sm text-[#1447E6] hover:text-[#0F3BC4] font-medium transition-colors">
              Forgot your password?
            </button>
          </div>
          
          {/* Demo Credentials */}
          <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 font-medium mb-1 text-center">Demo Credentials:</p>
            <div className="text-xs text-blue-600 space-y-1 text-center">
              <div><span className="font-medium">Username:</span> admin</div>
              <div><span className="font-medium">Password:</span> admin123</div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>© 2024 ISP Operator Portal. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}