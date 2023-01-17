import { ref,uploadBytes,getDownloadURL   } from "firebase/storage";
import { app,storage } from "./index";
import toast from 'react-hot-toast';


//! UPLOAD


export async function download (path){
    return getDownloadURL(ref(storage, path))
    .then((url) => {
        console.log("Link recuperado")
        console.log(url)
        return url
    })
    .catch((error) => {

        switch (error.code) {
        case 'storage/object-not-found':
            toast.error('Storage error: objeto no encontrado')
            break;
        case 'storage/unauthorized':
            toast.error('Storage error: No autorizado')
            break;
        case 'storage/canceled':
            toast.error('Storage error: Subida cancelada')
            break;
        case 'storage/unknown':
            toast.error("Error desconocido")
            break;
    }
  })
}

export async function upload(name,file) {
    const storageRef = ref(storage, name);

    return uploadBytes(storageRef, file).then((snapshot) => {
        console.log("hecho")
        return name
   }).catch(err => alert(err))
}


 