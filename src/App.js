import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const { REACT_APP_UPLOAD_API } = process.env;

const App = () => {
  const [file, setFile] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFile(files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);

    const formData = new FormData();
    formData.append('file', file);

    const response = await toast.promise(axios.post(`${REACT_APP_UPLOAD_API}/uploads/v1`, formData, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
      }
    }), {
      pending: 'Uploading file...',
      success: 'File uploaded!',
      error: 'Error while uploading file'
    });

    if (response) {
      setIsDisabled(false);
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3 w-96">
          <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-700">
            Upload file
          </label>
          <input
            className="form-control block w-full px-3 py-1.5 text-base font-normal
                      text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                      rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                      focus:border-blue-600 focus:outline-none"
            type="file"
            id="formFile"
            accept=".zip"
            onChange={handleFileChange} />
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs
                    leading-tight uppercase rounded shadow-md hover:bg-blue-700
                    hover:shadow-lg focus:bg-blue-700 focus:shadow-lg
                    focus:outline-none focus:ring-0 active:bg-blue-800
                    active:shadow-lg transition duration-150 ease-in-out"
          disabled={isDisabled}>
          Upload
        </button>
      </form>
    </div>
  )
};

export default App;
