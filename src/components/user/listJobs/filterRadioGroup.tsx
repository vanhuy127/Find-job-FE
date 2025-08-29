import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { memo } from "react"

interface FilterRadioGroupProps {
    title: string
    color: string
    value: string
    options: { label: string; value: string }[]
    onChange: (value: string) => void
}

const FilterRadioGroup = ({ title, color, value, options, onChange }: FilterRadioGroupProps) => {
    return (
        <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${color}`}></div>
                {title}
            </h3>
            <RadioGroup value={value} onValueChange={onChange}>
                {options.map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-3">
                        <RadioGroupItem
                            value={opt.value}
                            id={`${title}-${opt.value}`}
                            className={color.replace("bg", "text")}
                        />
                        <Label
                            htmlFor={`${title}-${opt.value}`}
                            className="text-sm cursor-pointer text-gray-700 dark:text-gray-300"
                        >
                            {opt.label}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

export default memo(FilterRadioGroup)
