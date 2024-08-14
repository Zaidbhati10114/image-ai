import { ActiveTool, Editor, FONT_SIZE, FONT_WEIGHT } from "../types";
import { Hint } from "./hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Copy,
  SquareSplitHorizontal,
  Trash,
} from "lucide-react";
import { BsBorderWidth } from "react-icons/bs";
import { TbColorFilter } from "react-icons/tb";
import { RxTransparencyGrid } from "react-icons/rx";
import { isTextType } from "../utils";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaUnderline,
} from "react-icons/fa6";
import { useState } from "react";
import { FontSizeInput } from "./font-size-input";

interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Toolbar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ToolbarProps) => {
  const initialFillColor = editor?.getActiveFillColor();
  const initialStrokeColor = editor?.getActiveStrokeColor();
  const initialFontFamily = editor?.getActiveFontFamily();
  const initialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT;
  const initialFontStyle = editor?.getActiveFontStyle();
  const initialFontLinethrough = editor?.getActiveFontLineThrough();
  const initialFontUnderline = editor?.getActiveFontUnderline();
  const initialTextAlign = editor?.getActiveTextAlign();
  const initialFontSize = editor?.getActiveFontSize() || FONT_SIZE;
  const [properties, setProperties] = useState({
    fillColor: initialFillColor,
    strokeColor: initialStrokeColor,
    fontFamily: initialFontFamily,
    fontWeight: initialFontWeight,
    fontStyle: initialFontStyle,
    fontLinethrough: initialFontLinethrough,
    fontUnderline: initialFontUnderline,
    textAlign: initialTextAlign,
    fontSize: initialFontSize,
  });
  const selectedObject = editor?.selectedObjects[0];
  const selectedObjectType = editor?.selectedObjects[0]?.type;
  const isText = isTextType(selectedObjectType);
  const isImage = selectedObjectType === "image";

  const onChangeTextAlign = (value: string) => {
    if (!selectedObject) return;
    editor?.changeTextAlign(value);
    setProperties((currentValue) => ({
      ...currentValue,
      textAlign: value,
    }));
  };

  const onChangeFontSize = (value: number) => {
    if (!selectedObject) return;
    editor?.changeFontSize(value);
    setProperties((currentValue) => ({
      ...currentValue,
      fontSize: value,
    }));
  };

  const toggleBold = () => {
    if (!selectedObject) return;
    const newValue = properties.fontWeight > 500 ? 500 : 700;
    editor?.changeFontWeight(newValue);
    setProperties((currentValue) => ({
      ...currentValue,
      fontWeight: newValue,
    }));
  };

  const toggleLineThrough = () => {
    //console.log("toggles");
    if (!selectedObject) return;

    const newValue = properties.fontLinethrough ? false : true;
    editor?.changeFontLineThrough(newValue);
    setProperties((currentValue) => ({
      ...currentValue,
      fontLinethrough: newValue,
    }));
  };

  const toggleLineUnderline = () => {
    //console.log("toggles");
    if (!selectedObject) return;

    const newValue = properties.fontUnderline ? false : true;
    editor?.changeFontUnderline(newValue);
    setProperties((currentValue) => ({
      ...currentValue,
      fontUnderline: newValue,
    }));
  };

  const toggleItalic = () => {
    //console.log("toggles");
    if (!selectedObject) return;
    //console.log(properties.fontStyle);
    const isItalic = properties.fontStyle === "italic";
    //console.log(isItalic);
    const newValue = isItalic ? "normal" : "italic";
    editor?.changeFontStyle(newValue);
    setProperties((currentValue) => ({
      ...currentValue,
      fontStyle: newValue,
    }));
  };

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
    );
  }
  //console.log(editor?.selectedObjects);

  return (
    <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      {!isImage && (
        <div className="flex flex items-center justify-center h-full">
          <Hint label="Color" side="bottom" sideOffset={4}>
            <Button
              onClick={() => onChangeActiveTool("fill")}
              size="icon"
              variant={"ghost"}
              className={cn(activeTool === "fill" && "bg-gray-100")}
            >
              <div
                className="rounded-sm size-4 border"
                style={{
                  backgroundColor: properties.fillColor,
                }}
              />
            </Button>
          </Hint>
        </div>
      )}
      {!isText && (
        <div className="flex flex items-center justify-center h-full">
          <Hint label="Stroke Color" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("stroke-color")}
              size="icon"
              variant={"ghost"}
              className={cn(activeTool === "stroke-color" && "bg-gray-100")}
            >
              <div
                className="rounded-sm size-4 border-2 bg-white"
                style={{
                  borderColor: properties.strokeColor,
                }}
              />
            </Button>
          </Hint>
        </div>
      )}
      {!isText && (
        <div className="flex flex items-center justify-center h-full">
          <Hint label="Stroke width" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("stroke-width")}
              size="icon"
              variant={"ghost"}
              className={cn(activeTool === "stroke-width" && "bg-gray-100")}
            >
              <BsBorderWidth className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex flex items-center justify-center h-full">
          <Hint label="Font" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("font")}
              size="icon"
              variant={"ghost"}
              className={cn(
                "w-auto px-2 text-sm",
                activeTool === "font" && "bg-gray-100"
              )}
            >
              <div className="max-w-[100px] truncate">
                {properties.fontFamily}
              </div>
              <ChevronDown className="size-4 ml-2 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex flex items-center justify-center h-full">
          <Hint label="Bold" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleBold}
              size="icon"
              variant={"ghost"}
              className={cn(properties.fontWeight > 500 && "bg-gray-100")}
            >
              <FaBold className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex flex items-center justify-center h-full">
          <Hint label="Italic" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleItalic}
              size="icon"
              variant={"ghost"}
              className={cn(properties.fontStyle === "italic" && "bg-gray-100")}
            >
              <FaItalic className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex flex items-center justify-center h-full">
          <Hint label="Underline" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleLineUnderline}
              size="icon"
              variant={"ghost"}
              className={cn(properties.fontUnderline && "bg-gray-100")}
            >
              <FaUnderline className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex flex items-center justify-center h-full">
          <Hint label="Strike" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleLineThrough}
              size="icon"
              variant={"ghost"}
              className={cn(properties.fontLinethrough && "bg-gray-100")}
            >
              <FaStrikethrough className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex flex items-center justify-center h-full">
          <Hint label="Align left" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeTextAlign("left")}
              size="icon"
              variant={"ghost"}
              className={cn(properties.textAlign === "left" && "bg-gray-100")}
            >
              <AlignLeft className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex flex items-center justify-center h-full">
          <Hint label="Align Center" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeTextAlign("center")}
              size="icon"
              variant={"ghost"}
              className={cn(properties.textAlign === "center" && "bg-gray-100")}
            >
              <AlignCenter className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex flex items-center justify-center h-full">
          <Hint label="Align right" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeTextAlign("right")}
              size="icon"
              variant={"ghost"}
              className={cn(properties.textAlign === "right" && "bg-gray-100")}
            >
              <AlignRight className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex flex items-center justify-center h-full">
          {/* Fontsise input */}
          <FontSizeInput
            value={properties.fontSize}
            onChange={onChangeFontSize}
          />
        </div>
      )}
      {isImage && (
        <div className="flex flex items-center justify-center h-full">
          <Hint label="Filters" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("filter")}
              size="icon"
              variant={"ghost"}
              className={cn(activeTool === "filter" && "bg-gray-100")}
            >
              <TbColorFilter className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isImage && (
        <div className="flex flex items-center justify-center h-full">
          <Hint label="Remove background" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("remove-bg")}
              size="icon"
              variant={"ghost"}
              className={cn(activeTool === "remove-bg" && "bg-gray-100")}
            >
              <SquareSplitHorizontal className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      <div className="flex flex items-center justify-center h-full">
        <Hint label="Bring forward" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.bringForward()}
            size="icon"
            variant={"ghost"}
          >
            <ArrowUp className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex flex items-center justify-center h-full">
        <Hint label="Send Backward" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.sendBackward()}
            size="icon"
            variant={"ghost"}
          >
            <ArrowDown className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex flex items-center justify-center h-full">
        <Hint label="Opacity" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("opacity")}
            size="icon"
            variant={"ghost"}
            className={cn(activeTool === "opacity" && "bg-gray-100")}
          >
            <RxTransparencyGrid className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex flex items-center justify-center h-full">
        <Hint label="Duplicate" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              editor?.OnCopy();
              editor?.onPaste();
            }}
            size="icon"
            variant={"ghost"}
          >
            <Copy className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex flex items-center justify-center h-full">
        <Hint label="Delete" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.delete()}
            size="icon"
            variant={"ghost"}
          >
            <Trash className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};