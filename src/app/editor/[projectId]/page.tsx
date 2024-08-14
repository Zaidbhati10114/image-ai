"use client";

import { Button } from "@/components/ui/button";
import { protectServer } from "@/features/auth/utils";
import Editor from "@/features/editor/components/editor";
import { useGetProject } from "@/features/projects/api/use-get-project";

import { Loader, TriangleAlert } from "lucide-react";
import Link from "next/link";
import React from "react";

interface EditorProjectIdPageProps {
  params: {
    projectId: string;
  };
}

const EditorProjectIdPage = ({ params }: EditorProjectIdPageProps) => {
  const { projectId } = params;
  const { data, isLoading, isError } = useGetProject(projectId);

  if (isLoading || !data) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full flex flex-col gap-y-5 items-center justify-center">
        <TriangleAlert className="size-6  text-muted-foreground" />
        <p className="text-muted-foreground text-sm">Failed to load project</p>
        <Button asChild variant={"secondary"}>
          <Link href={"/"}>Home</Link>
        </Button>
      </div>
    );
  }

  return <Editor initialData={data} />;
};

export default EditorProjectIdPage;
