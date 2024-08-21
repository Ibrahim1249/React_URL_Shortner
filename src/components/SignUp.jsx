import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import * as Yup from "yup";
import Error from "../components/Error";
import { useContext, useEffect, useState } from "react";
import useFetch from "../Hook/useFetch";
import {signup } from "../db/apiAuth"
import { useNavigate, useSearchParams } from "react-router-dom";
 import { UrlState } from "../context";

function SignUp() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  let longLink = searchParams.get("createNew");

  const [errors , setErrors] = useState({});
  const [formData,setFormData] = useState({
     email:"",
     password:"",
     name : "",
     profile_pic:null
  })
  const {loading , data , error , fn:signUp} = useFetch(signup, formData);

  function handleInputChange(e){
    const {name , value , files} = e.target;
    setFormData((prevFormData)=>({
       ...prevFormData,
       [name] : files ? files[0] : value
    }))
  }

  async function handleSignUp(){
    setErrors([]);
    try{
       const schema = Yup.object({
         email : Yup.string().email("Invalid Email").required("Email is required!"),
         password:Yup.string().min(6,"Password must be at least 6 length").required("Password is required"),
         name : Yup.string().required("Name is required"),
         profile_pic : Yup.mixed().required("Profile picture is required")
       })
       await schema.validate(formData ,{abortEarly:false})
       await signUp()
       
    }catch(error){
      const newErrors = {};
      if (error?.inner) {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });

        setErrors(newErrors);
      } else {
        setErrors({api: error.message});
      }
    }
  }


  useEffect(()=>{
   navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
  },[data , error])


  return (
    <Card>
    <CardHeader>
      <CardTitle>SignUp</CardTitle>
      <CardDescription>
        Create a new account if you haven&rsquo;t already
      </CardDescription>
      {error && <Error message={error?.message} />}
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="space-y-1">
        <Input
          name="name"
          type="text"
          placeholder="Enter Name"
          onChange={handleInputChange}
        />
      </div>
      {errors.name && <Error message={errors.name} />}
      <div className="space-y-1">
        <Input
          name="email"
          type="email"
          placeholder="Enter Email"
          onChange={handleInputChange}
        />
      </div>
      {errors.email && <Error message={errors.email} />}
      <div className="space-y-1">
        <Input
          name="password"
          type="password"
          placeholder="Enter Password"
          onChange={handleInputChange}
        />
      </div>
      {errors.password && <Error message={errors.password} />}
      <div className="space-y-1">
        <input
          name="profile_pic"
          type="file"
          accept="image/*"
          onChange={handleInputChange}
        />
      </div>
      {errors.profile_pic && <Error message={errors.profile_pic} />}
    </CardContent>
    <CardFooter>
      <Button onClick={handleSignUp}>
        {loading ? (
          <BeatLoader size={10} color="#36d7b7" />
        ) : (
          "Create Account"
        )}
      </Button>
    </CardFooter>
  </Card>
  )
}

export default SignUp