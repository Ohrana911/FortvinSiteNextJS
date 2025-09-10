import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";
import React from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";

interface Props {
    className ?: string;
}


export const Filters: React.FC<Props> = ({ className }) => {
    return (
        <div className={className}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

            <div className="flex flex-col gap-4">
                <FilterCheckbox text="Цена" value="1" />
                <FilterCheckbox text="Завод" value="2" />
                <FilterCheckbox text="Материал" value="2" />
                <FilterCheckbox text="Форма" value="2" />
            </div>

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input type="number" placeholder="0" min={0} max={30000} defaultValue={0} />
                    <Input type="number" min={100} max={30000} placeholder="30000"/>
                </div>

                <RangeSlider min={0} max={50000} step={10} value={[0, 50000]} />
            </div>


            <CheckboxFiltersGroup
                title="Приметы"
                className="mt-5"
                limit={7}
                defaultItems={[
                    {
                        text: 'Водостойкость',
                        value: '1'
                    },
                    {
                        text: 'Размер',
                        value: '1'
                    },
                    {
                        text: 'Вес',
                        value: '1'
                    },
                    {
                        text: 'Цвет',
                        value: '1'
                    },
                    {
                        text: 'Морозостойкость',
                        value: '1'
                    },
                    {
                        text: 'Кол-во на поддоне',
                        value: '1'
                    },
                    {
                        text: 'Кол-во поддонов в машине',
                        value: '1'
                    },
                    {
                        text: 'Кол-во в машине',
                        value: '1'
                    }
                ]} items={[
                                        {
                        text: 'Водостойкость',
                        value: '1'
                    },
                    {
                        text: 'Размер',
                        value: '1'
                    },
                    {
                        text: 'Вес',
                        value: '1'
                    },
                    {
                        text: 'Цвет',
                        value: '1'
                    },
                    {
                        text: 'Морозостойкость',
                        value: '1'
                    },
                    {
                        text: 'Кол-во на поддоне',
                        value: '1'
                    },
                    {
                        text: 'Кол-во поддонов в машине',
                        value: '1'
                    },
                    {
                        text: 'Кол-во в машине',
                        value: '1'
                    },
                    {
                        text: 'Водостойкость',
                        value: '1'
                    },
                    {
                        text: 'Размер',
                        value: '1'
                    },
                    {
                        text: 'Вес',
                        value: '1'
                    },
                    {
                        text: 'Цвет',
                        value: '1'
                    },
                    {
                        text: 'Морозостойкость',
                        value: '1'
                    },
                    {
                        text: 'Кол-во на поддоне',
                        value: '1'
                    },
                    {
                        text: 'Кол-во поддонов в машине',
                        value: '1'
                    },
                    {
                        text: 'Кол-во в машине',
                        value: '1'
                    }
                ]}            />

        </div>
    );
};