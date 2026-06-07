import Image from "next/image";
import SignInFormClient from "@/modules/auth/components/sign-in-form-client";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4">
      <Image
  src="/login.svg"
  alt="Login-Image"
  fill={false}
  width={300}
  height={300}
  className="object-contain max-h-[300px] w-auto"
  priority
/>

      <SignInFormClient />
    </div>
  );
};

export default Page;




