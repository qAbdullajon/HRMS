import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Apple, Check, Eye, EyeOff } from "lucide-react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useLogin } from "../hooks/useAuth"
import { addAccessToken } from "@/utils/localStorage"
import { NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import type { ErrorResponse } from "../types/authTypes"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { reset } from "@/features/forgot-password/emailSlice"

const formSchema = z.object({
  email: z.string().email({ message: "Iltimos, email kiriting!" }),
  password: z.string().min(6, { message: "Kamida 6 ta belgi bo‘lishi kerak!" }).max(20, { message: "Kopida 20 ta belgi bo‘lishi kerak!" }),
  terms: z.boolean()
})

export default function LoginPage() {
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      terms: false
    }
  })

  useEffect(() => {
    dispatch(reset())
  }, [])

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values
    mutate({ email, password }, {
      onSuccess: (data) => {
        addAccessToken(data.accessToken)
        navigate('/')
      },
      onError: (err: ErrorResponse) => {
        toast.error(err.response?.data?.message ?? err.message ?? "Xatolik yuz berdi")
      }
    })
  }

  return (
    <>
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
              <h3 className="flex items-center gap-2">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-color">
                  <Apple color="white" size={24} />
                </div>
                <span className="text-2xl font-medium">HRMS</span>
              </h3>
              <p className="text-[30px] font-semibold text-dark pt-10">
                Welcome 👋
              </p>
              <p className="text-gray text-base font-light">Please login here</p>
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder={!showPassword ? "••••••••" : "password"}
                            {...field}
                            autoComplete="current-password"
                            className="pr-10"
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
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-1">
                        <FormControl>
                          <div className="relative flex items-center">
                            <input
                              type="checkbox"
                              id="terms"
                              checked={field.value}
                              onChange={field.onChange}
                              className="peer appearance-none w-6 h-6 border border-gray-300 rounded bg-white checked:bg-primary-color transition-colors"
                            />
                            <Check strokeWidth={3} className="absolute top-[4px] left-[4px] m-auto w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition" />
                          </div>
                        </FormControl>
                        <FormLabel htmlFor="terms" className="text-base font-light leading-none">
                          Remember Me
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <NavLink to={'/forgot-password'} className="text-primary-color text-base hover:underline cursor-pointer">Forgot Password?</NavLink>
                </div>
                <Button type="submit" disabled={isPending}>Login</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}
