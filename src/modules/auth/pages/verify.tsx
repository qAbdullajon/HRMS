import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import type { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "@/components/ui/sonner";
import type { ErrorResponse } from "../types/authTypes";
import { setStateCode, setStatePass } from "@/features/forgot-password/emailSlice";
import { useRestetPassword } from "../hooks/useAuth";

export default function VerifyPage() {
  const {mutate, isPending} = useRestetPassword()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state: RootState) => state.forgotEmail.email);
  
  // State declarations
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Redirect immediately if no email
  useEffect(() => {
    dispatch(setStateCode())
    if (!email) {
      navigate('/login', { replace: true });
    }
  }, [email, navigate]);

  // Memoized submit handler
  const handleSubmit = useCallback(() => {
    const code = otp.join("");
    if (code.length !== 5) return;

    mutate({ email, code }, {
      onSuccess: () => {
        dispatch(setStatePass());
        navigate(`/reset-password?code=${code}`);
      },
      onError: (error: ErrorResponse) => {
        toast.error(error.response?.data?.message ?? error.message ?? "An error occurred");
        setOtp(["", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    });
  }, [otp, email, mutate, dispatch, navigate]);

  // Auto-submit effect
  useEffect(() => {
    if (otp.every(digit => digit !== "")) {
      handleSubmit();
    }
  }, [otp, email, handleSubmit]);

  // Early return if no email (after all hooks)
  if (!email) {
    return null;
  }

  const handleChange = (value: string, index: number) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text").trim();
    if (/^\d{5}$/.test(paste)) {
      e.preventDefault();
      const digits = paste.split("");
      setOtp(digits);
      inputRefs.current[4]?.focus();
    }
  };

  const handleBack = () => {
    sessionStorage.removeItem('email');
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="hidden lg:block lg:w-1/2 bg-indigo-50">
        <div className="h-full flex items-center justify-center p-12">
          <img
            src="/src/assets/auth-light.png"
            alt="Education illustration"
            className="max-w-md w-full rounded-4xl"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div
            onClick={handleBack}
            className="flex items-center gap-1 text-black cursor-pointer w-fit p-1 hover:bg-gray-100 rounded"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleBack()}
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </div>

          <div>
            <h1 className="text-3xl font-semibold text-gray-900 pt-5">Enter OTP</h1>
            <p className="text-gray-600 text-base font-light">
              We have sent a code to your registered email address {email}
            </p>
          </div>

          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => { inputRefs.current[index] = el }}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={(e) => handlePaste(e)}
                disabled={isPending}
                className="text-center text-lg w-12 h-12 border-2 rounded-md focus:border-indigo-600 focus-visible:ring-0"
                autoFocus={index === 0}
              />
            ))}
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={otp.some(digit => digit === "") || isPending}
          >
            {isPending ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </div>
    </div>
  );
}