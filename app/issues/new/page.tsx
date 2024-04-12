"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, set } from "react-hook-form";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type IssueForm = {
  title: string;
  description: string;
};

const NewIssuePage = () => {
  const router = useRouter();
  const { register, handleSubmit, control } = useForm<IssueForm>();
  const [error,seterror] = useState('');

  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post("/api/v1/issues", data);
      router.push("/issues"); 
    } catch (error) {
      seterror('Failed to submit issue');
    }
  };
  return (
    <div className="max-w-xl">
        {error &&<Callout.Root color="red" className="mb-5">
            <Callout.Text>{error}</Callout.Text> 
            </Callout.Root>}
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
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
    </div>
  );
};

export default NewIssuePage;
