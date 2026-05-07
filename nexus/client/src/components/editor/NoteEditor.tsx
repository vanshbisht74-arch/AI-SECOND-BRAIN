import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Italic, List, ListOrdered, Quote, Heading1, Heading2 } from 'lucide-react'

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null

  return (
    <div className="flex flex-wrap gap-2 mb-4 p-2 border-b border-slate-200 dark:border-slate-800">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1.5 rounded ${editor.isActive('bold') ? 'text-nexus-600 bg-nexus-50' : 'text-slate-500'}`}><Bold size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1.5 rounded ${editor.isActive('italic') ? 'text-nexus-600 bg-nexus-50' : 'text-slate-500'}`}><Italic size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`p-1.5 rounded ${editor.isActive('heading', { level: 1 }) ? 'text-nexus-600 bg-nexus-50' : 'text-slate-500'}`}><Heading1 size={18} /></button>
    </div>
  )
}

export default function NoteEditor({ content, onChange }: { content?: string, onChange?: (val: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || '<h1>Start writing...</h1>',
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    editorProps: { attributes: { class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[400px] py-4' } }
  })

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <MenuBar editor={editor} />
      <div className="px-8"><EditorContent editor={editor} /></div>
    </div>
  )
}
