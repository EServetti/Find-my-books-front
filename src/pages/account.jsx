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
import closeImg from "../assets/close.png";
import readNoti from "../assets/notification.png";
import useNotifications from "../hooks/useNotifications";
import markAsRead from "../services/markAsRead";
import answerFriendRequest from "../services/answerRequest";

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
  const fileInputRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [imgSelected, setImgSelected] = useState(false);
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
      setImgSelected(!imgSelected);
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

  //Manejo de notificaciones
  const [notiChange, setNotiChange] = useState(false);
  const { notifications, loadingNotifications } = useNotifications(notiChange);

  function handleNoti(_id, req_id, status, sender_id, receiver_id) {
    markAsRead(_id, setNotiChange, notiChange);
    if (status) {
      answerFriendRequest(
        req_id,
        status,
        sender_id,
        receiver_id,
        setNotiChange,
        notiChange
      );
    }
  }

  return (
    <>
      <div className={`main-account${imgSelected ? `-blurred` : ``}`}>
        <section className="notifications">
          <h3>Notifications</h3>
          {loadingNotifications ? (
            <h4>...Loading</h4>
          ) : !notifications ? (
            <>
              <h4>You have no notifications yet, here you'll see:</h4>
              <ul>
                <li>If someone has sent you a friend request</li>
                <li>If someone has shared a book with you</li>
              </ul>
            </>
          ) : (
            notifications.map((n) => {
              return (
                <div className="notification" key={n._id}>
                  {n.type === "sharedBook" ? (
                    <>
                      <img src={n.sender.photo} />
                      <p>
                        {n.sender.name} shared a book with you on{" "}
                        {new Date(n.createdAt).toLocaleString()}
                      </p>
                      {n.read ? (
                        <></>
                      ) : (
                        <div className="tooltip-container">
                          <button
                            className="notification-button"
                            onClick={() => handleNoti(n._id)}
                          >
                            <img src={readNoti} />
                          </button>
                          <span className="tooltip-text">Mark as read</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <img src={n.sender.photo} />
                      <p>
                        {n.sender.name} sent you a friend request on{" "}
                        {new Date(n.createdAt).toLocaleString()}
                      </p>
                      {n.friendRequest?.status === "accepted" ? (
                        <p>The request was accepted</p>
                      ) : n.friendRequest?.status === "rejected" ? (
                        <p>The request was rejected</p>
                      ) : (
                        <span className="accept-decline">
                          <button
                            className="accept"
                            onClick={() =>
                              handleNoti(
                                n._id,
                                n.friendRequest._id,
                                "accepted",
                                n.friendRequest.sender,
                                n.friendRequest.receiver
                              )
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="decline"
                            onClick={() =>
                              handleNoti(n._id, n.friendRequest._id, "rejected")
                            }
                          >
                            Decline
                          </button>
                        </span>
                      )}
                      {n.read ? (
                        <></>
                      ) : (
                        <div className="tooltip-container">
                          <button
                            className="notification-button"
                            onClick={() => handleNoti(n._id)}
                          >
                            <img src={readNoti} />
                          </button>
                          <span className="tooltip-text">Mark as read</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })
          )}
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
                    ref={fileInputRef}
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
          ) : (
            <></>
          )}
          {crop && (
            <canvas ref={previewCanvasRef} className="user-image-canvas" />
          )}
        </section>
      </div>
      {imgSrc && (
        <div className="image-crop">
          <button
            className="close-crop"
            onClick={() => {
              setImgSrc("");
              setImgSelected(!imgSelected);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
          >
            <img src={closeImg} />
          </button>
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
              updatePhoto(
                user._id,
                dataUrl,
                setChange,
                change,
                setImgSrc,
                setError,
                setImgSelected,
                fileInputRef
              );
            }}
          >
            Crop and update
          </button>
        </div>
      )}
    </>
  );
}

export default Account;
