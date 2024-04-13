"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, set } from "react-hook-form";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateIssueSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/errorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof CreateIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueForm>({ resolver: zodResolver(CreateIssueSchema) });
  const [error, seterror] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = async (data: IssueForm) => {
    try {
      setSubmitting(true);
      await axios.post("/api/v1/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
      seterror("Failed to submit issue");
    }
  };
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root
          placeholder="Title "
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
          name="description"
          control={control}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
