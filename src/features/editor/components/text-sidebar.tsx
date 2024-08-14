"use client";
import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";

import { Slider } from "@/components/ui/slider";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface TextSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const TextSidebar = ({
  activeTool,
  editor,
  onChangeActiveTool,
}: TextSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "text" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="Text" description="Add text to your canvas" />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Button className="w-full" onClick={() => editor?.addText("Textbox")}>
            Add a textbox
          </Button>
          <Button
            variant={"secondary"}
            className="w-full h-16"
            size={"lg"}
            onClick={() =>
              editor?.addText("Heading", { fontSize: 80, fontWeight: 700 })
            }
          >
            <span className="text-2xl font-bold">Add a Heading</span>
          </Button>
          <Button
            variant={"secondary"}
            className="w-full h-16"
            size={"lg"}
            onClick={() =>
              editor?.addText("SubHeading", { fontSize: 44, fontWeight: 500 })
            }
          >
            <span className="text-2xl font-semibold">Add a Sub Heading</span>
          </Button>
          <Button
            variant={"secondary"}
            className="w-full h-16"
            size={"lg"}
            onClick={() => editor?.addText("Paragraph", { fontSize: 32 })}
          >
            Paragraph
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
