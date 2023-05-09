import { useRef } from "react";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";
import { addPhoto } from "../store/slices/photoSlice";

const Photo = () => {
  const fileInput = useRef();
  const photoList = useSelector((state) => state.photo.photoList);

  const photoListWithoutLast = photoList.slice();

  const lastPhoto = photoListWithoutLast.pop();

  const dispatch = useDispatch();

  const changeFiles = () => {
    const newFiles = fileInput.current.files;
    const urls = [];
    for (const file of newFiles) {
      urls.push({
        src: window.URL.createObjectURL(file),
        name: file.name,
        id: nanoid(),
      });
    }
    dispatch(addPhoto(urls));
  };

  return (
    <>
      <header>
        <input
          onChange={changeFiles}
          ref={fileInput}
          type="file"
          name="photo-file"
          id="photo-file"
          multiple
          accept="image/*"
        />
      </header>
      {!!photoList.length ? (
        <div className="photo-container">
          <img className="photo-img" src={lastPhoto.src} alt={lastPhoto.name} />

          <div className="photo-history">
            {photoListWithoutLast.map((photo) => {
              const { id, src, name } = photo;
              return (
                <img className="photo-img" src={src} alt={name} key={id} />
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Photo;
