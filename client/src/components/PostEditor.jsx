import { useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

export default function PostEditor({ content, setContent }) {
  useEffect(() => {
    const editorContainer = document.querySelector('.ql-editor');
    if (editorContainer) {
      editorContainer.style.minHeight = '200px';

      document.querySelector(".ql-snow").classList.add("dark:bg-gray-300");
      document.querySelector(".ql-blank").classList.add("dark:bg-dark-main");
    }
  }, []);



  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: '-1' }, { indent: '+1' },],
      ["link", "image"],
      [{ "code-block": true }],
      ['clean'], // Remove formatting option
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "indent",
    "image",
    "code-block",
  ];


  return (
    // <div className=''>
    <ReactQuill theme='snow' className='dark:bg-gray-900 text-black dark:text-white' value={content} onChange={setContent} modules={modules} placeholder='Write your blog content' formats={formats}  />
        //  <button onClick={() => //console.log(content)} className='bg-red-700 text-white p-5'> Create </button>
    // {/* </div> */ }
)
}
