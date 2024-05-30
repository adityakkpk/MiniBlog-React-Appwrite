import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from '../conf/conf';

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label} <p className="text-gray-600">(Content should be less than 255 characters.)</p> </label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={conf.tinyMCEAPIKey}
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              branding: false,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor"
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor |  alignleft alighcenter bold italic forecolr | alignleft alighcenter alighright alignjustify |  bullist numlist outdent indent | removeformat | help",
              content_style: "body { font-family:Helvetica, Arial, sans-serif; font-size: 14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
