import React from 'react'
import Login from "../components/Login"
import SignUp from "../components/SignUp"
import { useNavigate, useSearchParams } from 'react-router-dom'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

function Auth() {
   let [searchParams] = useSearchParams();
   let navigate = useNavigate();
   let longLink = searchParams.get("createNew");
  return (
    <>
       <div className="mt-36 flex flex-col items-center gap-10">
        <h1 className='text-5xl font-extrabold'>{longLink ? "Hold up! Let's login first.." : "Login / Signup"}</h1>
        <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <SignUp />
        </TabsContent>
      </Tabs>
       </div>
    </>
  )
}

export default Auth