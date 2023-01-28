import React from 'react';

function UploadWrapper({children, onChange, multiple, onlyImg}) {
  const inputFile = React.useRef(null);
  return (
    <>
      <div onClick={() => inputFile.current.click()}>
        {children}
      </div>
      <input type='file' id='file' ref={inputFile} style={{display: 'none'}}
             onChange={e => onChange(multiple ? [...e.target.files] : [...e.target.files][0])} multiple={multiple}
             accept={onlyImg && "image/png, image/gif, image/jpeg"}/>
    </>
  )
}

export default UploadWrapper;
