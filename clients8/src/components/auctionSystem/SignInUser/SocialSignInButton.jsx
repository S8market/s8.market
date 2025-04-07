import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

export const SocialSignInButton = ({ icon, text,serverApi }) => {
  const handleClick = async () => {
    try {
      window.location.href = serverApi
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  return (
    <div onClick={handleClick} className="flex flex-1 gap-2 items-center px-6 py-5 bg-white rounded-2xl cursor-pointer border border-solid border-zinc-900 border-opacity-10 min-h-[54px] max-md:px-5">
      <div className="flex gap-1 justify-center items-center self-stretch my-auto w-4 rounded-lg">
        <img loading="lazy" src={icon} alt="" className="object-contain self-stretch my-auto w-4 aspect-square" />
      </div>
      <div className="self-stretch my-auto text-sm leading-none text-center rounded-lg text-zinc-900">
        {text}
      </div>
    </div>
  );
};  