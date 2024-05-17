'use client'

import { useState } from 'react'
import { unwrapResult } from '@reduxjs/toolkit'
import { BsFillEyeSlashFill } from 'react-icons/bs'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { useActions } from '@/hooks/useAction'
import { IEmailPassword } from '@/store/user/user.interface'

import Field from '@/components/ui/form/input/Input'
import Button from '@/components/ui/btn/button/Button'
import SubHeading from '@/components/ui/heading/SubHeading'

import styles from './Auth.module.scss'

export default function Page() {
	const [type, setType] = useState<'login' | 'register'>('login')
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [typeString, setTypeString] = useState<boolean>(false)

	const { login, register } = useActions()
	const router = useRouter()
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors }
	} = useForm<IEmailPassword>({
		mode: 'onChange'
	})

	const onSumbit: SubmitHandler<IEmailPassword> = async data => {
		try {
			const result = await login(data)
			const originalRes = unwrapResult<any>(result)
			// : register(data)

			router.replace('/dashboard/orders')
		} catch (error: unknown) {
      /* @ts-ignore */
			if (error) setErrorMessage(error.message)
		}
	}

	return (
		<div className={styles.auth}>
			<div className="pb-4">
				<SubHeading title="Авторизация" />
			</div>

			<form className={styles.form} onSubmit={handleSubmit(onSumbit)}>
				<Field
					type="email"
					label="Email"
					placeholder="Введите email"
					{...formRegister('email', {
						required: 'Поле email обязательное'
					})}
					error={errors.email?.message}
				/>

				<div className="relative w-full">
					<Field
						type={typeString ? 'string' : 'password'}
						label="Пароль"
						placeholder="Введите пароль"
						{...formRegister('password', {
							required: 'Поле пароль обязательное',
							minLength: {
								value: 6,
								message: 'Длина пароля должна быть больше 6 символов'
							}
						})}
						error={errors.password?.message}
					/>

					<BsFillEyeSlashFill
						size="20"
						color={typeString ? 'black' : 'var(--dark-grey)'}
						className="absolute right-2 top-7"
						onClick={() => setTypeString(!typeString)}
					/>
				</div>

				{errorMessage && (
					<div className="text-sm text-[var(--red)] font-bold">
						{errorMessage}
					</div>
				)}

				<Button title={type === 'login' ? 'Войти' : 'Регистрация'} />
			</form>
		</div>
	)
}
