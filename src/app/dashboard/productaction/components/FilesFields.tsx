import Image from 'next/image'
import { ChangeEvent } from 'react'
import { Control } from "react-hook-form"

import { IProduct } from "@/services"

import { TbTrash } from 'react-icons/tb'
import File from '@/components/ui/form/file/File'

import styles from '../../Dashboard.module.scss';

interface FilesFieldProps {
    // control: Control<IProduct>
}

export const FilesField = ({  }: FilesFieldProps) => {
    // const deleteImage = async (value: string) => {
	// 	const path = value.split('/').slice(-2).join('/')

	// 	await ProductService.deleteFile({ path })

	// 	const addedImages = getValues('images').filter(item => item !== value)

	// 	setValue('images', addedImages)
	// }

    // const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
	// 	const { files } = event.target
	// 	const formData = new FormData()

	// 	const selectedFiles = files as FileList

	// 	for (const file of selectedFiles) {
	// 		formData.append('files', file)
	// 	}

	// 	const { data } = await ProductService.uploadFile(formData)

	// 	const pathImages = data.map(({ Location }) => Location)

	// 	setValue('images', [...getValues('images'), ...pathImages])
	// }

    return (
        <File
            multiple
            accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp"
            // onChange={uploadFile}
        />
        // <div className={styles.container}>
            // <File
            //     multiple
            //     accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp"
            //     onChange={uploadFile}
            // />
                // {watch('images').length > 0 ? (
                //     <div className={styles.images}>
                //         {watch('images').map((path, index) => (
                //             <div key={index} className={styles.image}>
                //                 <Image src={path} alt={getValues('name')} fill />

                //                 <div
                //                     className={styles.image__delete}
                //                     onClick={() => deleteImage(path)}
                //                 >
                //                     <TbTrash />
                //                 </div>
                //             </div>
                //         ))}
                //     </div>
                // ) : null}
        // {/* </div> */}
    )
}