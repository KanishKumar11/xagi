"use client";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const ShowToast = ({ message }) => {
  toast.loading(message);

  return (
    <div>
      <Toaster />
    </div>
  );
};

export default ShowToast;
