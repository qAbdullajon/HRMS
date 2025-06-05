import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForgotPassword } from "../hooks/useAuth"
import type { ErrorResponse } from "../types/authTypes"
import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { createEmail, reset } from "@/features/forgot-password/emailSlice"
import { toast } from "@/components/ui/sonner"
import { useEffect } from "react"

const formSchema = z.object({
    email: z.string().email({ message: "Iltimos, email kiriting!" }),
})

export default function ForgotPassword() {
    const navigator = useNavigate()
    const { mutate, isPending } = useForgotPassword();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(reset())
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const { email } = values
        mutate({ email }, {
            onSuccess: () => {
                dispatch(createEmail(email))
                navigator('/verify')
            },
            onError: (err: ErrorResponse) => {
                toast.error(err.response?.data?.message ?? err.message ?? "Xatolik yuz berdi")
            }
        })
    }

    return (
        <div className="min-h-screen flex">
            {/* Chap tomon - Rasm */}
            <div className="hidden lg:block lg:w-1/2 bg-indigo-50">
                <div className="h-full flex items-center justify-center p-12">
                    <img
                        src="/src/assets/auth-light.png"
                        alt="Education illustration"
                        className="max-w-md w-full rounded-4xl"
                    />
                </div>
            </div>

            {/* O'ng tomon - Login Forma */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <div onClick={() => navigator(-1)} className="flex items-center gap-[5px] text-black cursor-pointer w-fit p-1">
                            <ChevronLeft />
                            <span>Back</span>
                        </div>
                        <p className="text-[30px] font-semibold text-dark pt-5">
                            Forgot Password
                        </p>
                        <p className="text-gray text-base font-light">Enter your registered email address. we’ll send you a code to reset your password.</p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="example@gmail.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isPending}>{!isPending ? "Send OTP" : "Loading..."}</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}
