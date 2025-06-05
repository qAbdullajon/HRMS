import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, Eye, EyeOff } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useChangePassword } from "../hooks/useAuth"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/app/store"
import { toast } from "sonner"
import type { ErrorResponse } from "../types/authTypes"

const formSchema = z.object({
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(32, "Password must not exceed 32 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
})

export default function ResetPasswordPage() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { email, state } = useSelector((state: RootState) => state.forgotEmail);
    const { mutate, isPending } = useChangePassword();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    useEffect(() => {
        if (!email) {
            navigate("/login");
        } else if (state === "sendCode") {
            navigate("/verify");
        }
    }, [email, state, navigate]);

    // 👉 Sahifa hali tayyor emas
    if (!email || state === "sendCode") {
        return null; // yoki <div>Redirecting...</div>
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (!code) {
            form.setError("root", { message: "Invalid verification code" });
            return;
        }

        mutate(
            { password: values.password, code, email },
            {
                onSuccess: () => {
                    navigate("/login");
                },
                onError: (error: ErrorResponse) => {
                    toast.error(
                        error.response?.data?.message ?? error.message ?? "Xatolik yuz berdi"
                    );
                },
            }
        );
    }

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

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-6">
                    <div
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm font-medium cursor-pointer w-fit p-1 hover:bg-accent rounded"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span>Back</span>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-[30px] font-semibold text-dark pt-5">Reset Password</h1>
                        <p className="text-muted-foreground">
                            Create a new password for your account
                        </p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter your new password"
                                                    className="pr-10"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-5 w-5" />
                                                    ) : (
                                                        <Eye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Confirm Password field */}
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="Confirm your new password"
                                                    className="pr-10"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOff className="h-5 w-5" />
                                                    ) : (
                                                        <Eye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password requirements */}
                            <div className="space-y-2 text-sm">
                                <ul className="space-y-1">
                                    <li className={form.watch("password")?.length >= 8 ? "text-green-500" : "text-muted-foreground"}>
                                        At least 8 characters
                                    </li>
                                    <li className={form.watch("password")?.length >= 8 ? "text-green-500" : "text-muted-foreground"}>
                                        Confirm password
                                    </li>
                                </ul>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isPending}
                            >
                                {isPending ? "Resetting..." : "Reset Password"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}