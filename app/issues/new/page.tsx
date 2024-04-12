"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type IssueForm = {
  title: string;
  description: string;
};

const NewIssuePage = () => {
  const router = useRouter();
  const { register, handleSubmit, control } = useForm<IssueForm>();

  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post("/api/v1/issues", data);
      router.push("/issues"); 
    } catch (error) {
      console.error("Failed to submit issue", error);
    }
  };
  return (
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <TextField.Root
        placeholder="Title "
        {...register("title")}
      ></TextField.Root>
      <Controller
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
        name="description"
        control={control}
      />
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
