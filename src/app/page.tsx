"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {ChangeEvent, useState} from "react";
import { toast } from "sonner"
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";


type Elem = "phone" | "password" | "confirmPassword"

type Inputs = {
    phone: string,
    password: string,
    confirmPassword?: string
}

export default function Home() {
    let inputs: Inputs = {
        phone: "",
        password: ""
    }

    const supabase = createClientComponentClient();

    let [error, setError] = useState<string>("")

    function onElemChange(e: ChangeEvent<HTMLInputElement>, elem: Elem) {
        inputs[elem] = e.target.value
    }

    const router = useRouter()

    return (
        <>
            <div className={"flex justify-center items-center align-middle h-screen"}>
                <Tabs defaultValue="username" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="username">Login</TabsTrigger>
                        <TabsTrigger value="password">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="username">
                        <Card>
                            <CardHeader>
                                <CardTitle>Login</CardTitle>
                                <CardDescription>
                                    Sign Up if you haven't already!
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="username">Phone</Label>
                                    <Input id="username" placeholder="Chef Moi" onChange={(e) => {
                                        onElemChange(e, "phone")
                                    }}/>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" placeholder="@peduarte" onChange={(e) => {
                                        onElemChange(e, "password")
                                    }}/>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={async (e) => {
                                    if (!inputs.phone || !inputs.password) {
                                        toast("Please fill out all fields!", {
                                            description: "You must fill out all fields to login.",
                                        })
                                        return
                                    }

                                    let {data, error } = await supabase.auth.signInWithPassword({
                                        phone: inputs.phone,
                                        password: inputs.password,
                                    })

                                    if(error) {
                                        toast("Error signing up!", {
                                            description: error.message,
                                        })
                                        return
                                    }

                                    console.log(data)
                                    if (data) {
                                        router.push('/dashboard')
                                    }
                                }}>Login</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="password">
                        <Card>
                            <CardHeader>
                                <CardTitle>Sign Up</CardTitle>
                                <CardDescription>
                                    Remember to use a strong password!
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="space-y-1">
                                    <Label htmlFor="current">Phone</Label>
                                    <Input id="username" type="email" onChange={(e) => {
                                        onElemChange(e, "phone")
                                    }}/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" onChange={(e) => {
                                        onElemChange(e, "password")
                                    }}/>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="confirm">Confirm Password</Label>
                                    <Input id="confirm" type="password" onChange={(e) => {
                                        onElemChange(e, "confirmPassword")
                                    }}/>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={async (e) => {
                                    if (inputs.password !== inputs.confirmPassword) {
                                        toast("Passwords do not match!", {
                                            description: "Please try again.",
                                        })
                                        return
                                    }

                                    if (!inputs.phone || !inputs.password || !inputs.confirmPassword) {
                                        toast("Please fill out all fields!", {
                                            description: "You must fill out all fields to login.",
                                        })
                                        return
                                    }

                                    if (inputs.password.length < 6  ) {
                                        toast("Password is too short!", {
                                            description: "Minimum password length is 6 characters."
                                        })
                                        return
                                    }

                                    const {data, error} = await supabase.auth.signUp({
                                        phone: inputs.phone,
                                        password: inputs.password
                                    })
                                    console.log(data)

                                    if(error) {
                                        toast("Error signing up!", {
                                            description: error.message,
                                        })
                                        return
                                    }
                                }}>Sign Up</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}
