'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const Create: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [uploadOption, setUploadOption] = useState<'image' | 'link' | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [link, setLink] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleImageUpload = async (): Promise<void> => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'rx9caypf'); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dw0ww8izh/image/upload', formData); // Replace with your Cloudinary URL
      setImageUrl(response.data.secure_url);
    } catch (error) {
      console.error('Error uploading the image', error);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (uploadOption === 'image' && file) {
      await handleImageUpload();
    }

    const postData = {
      title,
      content,
      imageUrl: uploadOption === 'image' ? imageUrl : '',
      link: uploadOption === 'link' ? link : '',
    };

    try {
      await axios.post('http://localhost:8000/api/blog/', postData); // Replace with your Django backend URL
      router.push('/'); // Navigate to the home page after a successful post
    } catch (error) {
      console.error('Error submitting the post', error);
    }
  };

  return (
    <div>
      <h1>Create a Post</h1>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Content:</label>
        <ReactQuill value={content} onChange={setContent} />
      </div>
      <div>
        <label>Upload Option:</label>
        <select
          value={uploadOption || ''}
          onChange={(e) => setUploadOption(e.target.value as 'image' | 'link')}
        >
          <option value="" disabled>Select an option</option>
          <option value="image">Image</option>
          <option value="link">Link</option>
        </select>
      </div>
      {uploadOption === 'image' && (
        <div>
          <label>Upload Image:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          />
        </div>
      )}
      {uploadOption === 'link' && (
        <div>
          <label>Link:</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
      )}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Create;
