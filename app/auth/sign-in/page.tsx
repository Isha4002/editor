import React from 'react'
import Image from "next/image";
import SignInFormClient from "@/modules/auth/components/sign-in-form-client";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      
      <Image
        src="/login.svg"
        alt="Login-Image"
        width={300}
        height={300}
        className="max-w-[300px] h-auto"
        priority
      />

      <SignInFormClient />

    </div>
  );
};

export default Page;