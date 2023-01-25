import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import "./qr.css"

function QRCodeGenerator() {
  const [data, setData] = useState('');
  const [url , setUrl] = useState('');
  const [generate , setGenerate] = useState(false)
  
  const downloadQR = () => {
    const canvas = document.getElementById("QRcode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "QRCode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  const handleGenerate = (e)=>{
    e.preventDefault()
    if(!data){
        return alert("Enter URL 1st")
    }
      setUrl(data)
      setData('')
      setGenerate(true)
  }
  const handleChange= (e)=>{
    setData(e.target.value)
  }
  const handleShow = ()=>{
    setGenerate(false)
  }
  return (
    <div className='wrapper'>
        <h1>{generate?"Scan This From Your Device":"QR-Code Generator"}</h1>
  <div className='input-wrapper'>
          {!generate?<input type="text" value={data} onChange={(e)=>{handleChange(e)}} placeholder="Enter URL to generate QR-Code" />:''}
         {!generate?<button onClick={handleGenerate}>Generate QR-Code</button>:<button onClick={handleShow}>Generate Another QR</button>}
          </div>
<div className='QR-wrapper'>
      {generate?<>
      <div className='QR'>
      <QRCode id='QRcode' value={url} size={300} 
         style={{boxShadow: "10px 10px 10px 10px gray"}}/>
         </div>
         <div className='btn'>
         <a onClick={downloadQR}> Download QR </a>
         </div>
         </>
         :''}
      </div>

    </div>
  );
}

export default QRCodeGenerator;
