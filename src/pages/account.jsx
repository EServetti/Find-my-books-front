import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/account.css";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import setCanvasPreview from "../services/setCanvasPreview";
import updatePhoto from "../services/updatePhoto";

function Account() {
  const { user, loading, setChange, change } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading]);

  
  //Manejo de actualizacion de imagen
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [error, setError] = useState("");
  
  function onSelectFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;
      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalHeight < 150 || naturalWidth < 150) {
          setError("Image must be at least 150 x 150 px.");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  }

  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (150 / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      1,
      width,
      height
    );
    const centredCrop = centerCrop(crop, width, height);
    setCrop(centredCrop);
  }

  return (
    <div className="main-account">
      <section className="notifications">
        <h3>Notifications</h3>
      </section>
      <section className="user-section">
        {loading ? (
          <h3>Loading...</h3>
        ) : !loading && user ? (
          <div className="user">
            <section className="user-info">
              <span className="user-photo">
                <img src={user.photo} alt="user" />
                <label htmlFor="change-photo">change</label>
                <input
                  id="change-photo"
                  type="file"
                  accept="image/*"
                  onChange={onSelectFile}
                />
              </span>
              <span className="user-name-and-email">
                <p>{user.name}</p>
                <p>{user.email}</p>
              </span>
              {error && <span style={{ color: "red" }}>{error}</span>}
            </section>
            <section className="user-metrics">
              <h3>User data</h3>
              <ul>
                <li>Books in list: {user.booksQuantity}</li>
                <li>Read books: {user.readBooks}</li>
                <li>Shared books: {user.sharedBooks}</li>
                <li>Friends: {user.friendsQuantity}</li>
              </ul>
            </section>
          </div>
        ): <></>}
        {imgSrc && (
          <div className="image-crop">
            <ReactCrop
              crop={crop}
              keepSelection
              aspect={1}
              minWidth={150}
              onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            >
              <img
                ref={imgRef}
                src={imgSrc}
                alt="user-image"
                onLoad={onImageLoad}
              />
            </ReactCrop>
            <button
              className="crop-button"
              onClick={() => {
                setCanvasPreview(
                  imgRef.current,
                  previewCanvasRef.current,
                  convertToPixelCrop(
                    crop,
                    imgRef.current.width,
                    imgRef.current.height
                  )
                );
                const dataUrl = previewCanvasRef.current.toDataURL();
                updatePhoto(user._id, dataUrl, setChange, change, setImgSrc, setError)
              }}
            >
              Crop and update
            </button>
          </div>
        )}
        {crop && (
          <canvas ref={previewCanvasRef} className="user-image-canvas" />
        )}
      </section>
    </div>
  );
}

export default Account;