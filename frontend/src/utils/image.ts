import {
  ref,
  uploadString,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { storage } from "@/src/firebase/firebase";
import { TUserState } from "@/src/stores/User";

export const convertContentImageSrcToLink = (
  content: string,
  user: TUserState
): Promise<string> => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");

  const imgTags = Array.from(doc.querySelectorAll("img"));

  const uploadPromiseArr = imgTags
    .map((img) => img.src)
    .map((src) => {
      const storageRef = ref(
        storage,
        `image/content/${user.id}-${user.nickname}/${Date.now()}-${src.slice(
          0,
          10
        )}`
      );
      return uploadString(storageRef, src, "data_url");
    });

  return Promise.all(uploadPromiseArr)
    .then((snapshots) => {
      const downloadPromiseArr = snapshots.map((snapshot) =>
        getDownloadURL(snapshot.ref)
      );
      return Promise.all(downloadPromiseArr);
    })
    .then((urls) => {
      urls.forEach((url, idx) => [(imgTags[idx].src = url)]);

      return doc.getElementsByTagName("body")[0].innerHTML;
    });
};

export const getThumbnailLink = async (file: File, user: TUserState) => {
  const storageRef = ref(
    storage,
    `image/thumbnail/${user.id}-${user.nickname}/${Date.now()}}`
  );
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);

  return url;
};
