// src/components/admin/LazzatBlogEditor.tsx
// Modern slide-style blog editor with Lazzat colors and branding
// Uses Tiptap for rich text editing
import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import './LazzatBlogEditor.css';

const SLIDES_INIT = [
  { title: "", subtitle: "", content: "<h1>Click to add title</h1><p>Click to add subtitle</p>" }
];

export default function LazzatBlogEditor({ value, onChange }) {
  const [slides, setSlides] = useState(SLIDES_INIT);
  const [active, setActive] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Click to add title" })
    ],
    content: slides[active].content,
    onUpdate: ({ editor }) => {
      const updated = [...slides];
      updated[active].content = editor.getHTML();
      setSlides(updated);
      onChange && onChange(updated);
    },
    editorProps: {
      attributes: {
        class: "lazzat-editor-canvas"
      }
    }
  });

  const addSlide = () => {
    setSlides([...slides, { title: "", subtitle: "", content: "<h1>Click to add title</h1><p>Click to add subtitle</p>" }]);
    setActive(slides.length);
  };

  return (
    <div className="lazzat-editor-root">
      {/* Sidebar */}
      <aside className="lazzat-editor-sidebar">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`lazzat-editor-slide-thumb${i === active ? " active" : ""}`}
            onClick={() => setActive(i)}
          >
            <div className="lazzat-editor-slide-thumb-inner">
              <span className="lazzat-editor-slide-thumb-title">
                {slide.title || `Slide ${i + 1}`}
              </span>
            </div>
          </div>
        ))}
        <button className="lazzat-editor-add-slide" onClick={addSlide}>+</button>
      </aside>
      {/* Main Canvas */}
      <main className="lazzat-editor-main">
        {/* Toolbar */}
        <div className="lazzat-editor-toolbar">
          {/* Example toolbar buttons (add more as needed) */}
          <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'active' : ''}><b>B</b></button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'active' : ''}><i>I</i></button>
          <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'active' : ''}><u>U</u></button>
          <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'active' : ''}>• List</button>
          <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'active' : ''}>1. List</button>
          <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'active' : ''}>Left</button>
          <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'active' : ''}>Center</button>
          <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'active' : ''}>Right</button>
          {/* Add more toolbar controls as needed */}
        </div>
        {/* Editor Canvas */}
        <EditorContent editor={editor} />
      </main>
    </div>
  );
}
