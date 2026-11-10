import { Control, Controller } from "react-hook-form";

import { IFlower, IProductForm } from '@/services'
import { useFlowerQuery } from "@/hooks/useQueries/useFlowerQuery";

import {
	Combobox,
	ComboboxChip,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxList,
	useComboboxAnchor,
	ComboboxItem,
	ComboboxValue,
	ComboboxChips,
	ComboboxChipsInput
} from '@/components/ui/combobox'
import { Field, FieldLabel } from '@/components/ui/field'

interface FlowersFieldProps {
    control: Control<IProductForm>
}

export const FlowersField = ({ control }: FlowersFieldProps) => {
    const anchor = useComboboxAnchor();

    const { data: flowers } = useFlowerQuery()

    return (
        <Controller
            name='flowers'
            control={control}
            rules={{ required: 'Поле Цветы обязательное' }}
            render={({ field }) => (
                <Field className="w-full">
                    <FieldLabel>Цветы</FieldLabel>
                    <Combobox
                        multiple
                        autoHighlight
                        items={flowers}
                        value={field.value}
                        onValueChange={(value) => {
                            field.onChange(
                                [...new Map(value.map(item => [item.id, item])).values()]
                            )
                        }}
                    >
                        <ComboboxChips ref={anchor} className="w-full max-w-xs">
                            <ComboboxValue>
                                {(values) => (
                                    <>
                                        {values.map((value: IFlower) => (
                                            <ComboboxChip key={value.id}>
                                                {value.name}
                                            </ComboboxChip>
                                        ))}
                                        <ComboboxChipsInput />
                                    </>
                                )}
                            </ComboboxValue>
                        </ComboboxChips>
                        <ComboboxContent ref={anchor}>
                            <ComboboxEmpty>Не найдено</ComboboxEmpty>
                            <ComboboxList>
                                {(item: IFlower) => (
                                    <ComboboxItem key={item.id} value={item}>
                                        {item.name}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </Field>
            )}
        />
    )
}