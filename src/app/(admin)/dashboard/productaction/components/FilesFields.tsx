import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import { UseFormGetValues, UseFormSetValue, UseFormWatch } from "react-hook-form"

import { IProductForm, ProductService } from "@/services"

import { TbTrash } from 'react-icons/tb'
import File from '@/components/ui/form/file/File'

import styles from '../../Dashboard.module.scss';

interface FilesFieldProps {
    watch: UseFormWatch<IProductForm>
    setValue: UseFormSetValue<IProductForm>
    getValues: UseFormGetValues<IProductForm>
}

export const FilesField = ({
    watch,
    setValue,
    getValues
}: FilesFieldProps) => {
    const deleteImage = async (value: string) => {
        const path = value.split('/').slice(-2).join('/')

        try {
            const result = await ProductService.deleteFile({ path })

            if (result.data) {
                const addedImages = getValues('images').filter(item => item !== value)

                setValue('images', addedImages)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target

        try {
            const formData = new FormData()
    
            const selectedFiles = files as FileList

            for (const file of selectedFiles) {
                formData.append('files', file)
            }

            const { data } = await ProductService.uploadFile(formData)

            const pathImages = data.map(({ Location }) => Location)

            setValue('images', [...getValues('images'), ...pathImages])
        } catch (error) {
            console.error(error)
        }
	}

    return (
        <div className={styles.files}>
            <File
                multiple
                // accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp"
                accept="image/*"
                onChange={uploadFile}
            />

            {watch('images').length > 0 ? (
                <div className={styles.images}>
                    {watch('images').map((path, index) => (
                        <div key={index} className={styles.image}>
                            <Image
                                src={path}
                                alt={getValues('name')}
                                sizes='(max-width: 768px) 16.25rem 150px'
                                fill
                                priority={index === 0}
                            />

                            <div
                                className={styles.image__delete}
                                onClick={() => deleteImage(path)}
                            >
                                <TbTrash />
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    )
}