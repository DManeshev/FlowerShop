import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { useActions } from '@/hooks/useAction'
import { IEmailPassword } from '@/store/user/user.interface'

import SubHeading from '@/components/ui/heading/SubHeading'
import Field from '@/components/ui/form/input/Input'

import Button from '@/components/ui/btn/button/Button'

interface IAuthHeader {}

export default function AuthHeader({}: IAuthHeader) {
	const [type, setType] = useState<'login' | 'register'>('login')

	const { login, register } = useActions()

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IEmailPassword>({
		mode: 'onChange'
	})

	const onSumbit: SubmitHandler<IEmailPassword> = data => {
		if (type === 'login') {
			login(data)
		} else register(data)

		reset()
	}

	return (
		<>
			<SubHeading title="Войти" className="text-center !pb-2" />

			<form onSubmit={handleSubmit(onSumbit)}>
                <Field
                    type="email"
                    label="Email"
                    placeholder="Введите email"
                    {...formRegister('email', {
                        required: 'Поле email обязательное'
                    })}
                    error={errors.email?.message}
                />

                <Field
                    type="password"
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

                <Button
                    title={type === 'login' ? 'Войти' : 'Регистрация'}
                    classes='w-full mt-2'
                />
            </form>
		</>
	)
}
