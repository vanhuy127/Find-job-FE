import React, { useState, useCallback } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useProvinceService } from '@/service/province.service';

interface LocationSelectProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const LocationSelect = React.memo(({ value, onChange, placeholder = "Chọn địa điểm" }: LocationSelectProps) => {
    const [open, setOpen] = useState(false);
    const { getProvinces } = useProvinceService();

    const { data: provinces } = useQuery({
        queryKey: ['provinces'],
        queryFn: () => getProvinces(),
    });

    const handleSelect = useCallback((provinceValue: string) => {
        onChange(provinceValue)
    }, [value, onChange]);

    const clear = useCallback(() => {
        onChange('');
    }, [onChange]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="h-14 w-full justify-between rounded-xl border-gray-200 bg-gray-50 pl-12 pr-4 text-left text-lg font-normal text-gray-900 hover:bg-gray-100 focus:border-cyan-500 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:hover:bg-gray-600/50 dark:focus:border-cyan-400"
                >
                    <div className="flex flex-1 items-center gap-2 overflow-hidden">
                        <MapPin className="absolute left-4 h-5 w-5 text-gray-400 dark:text-gray-500" />
                        {!value ? (
                            <span className="text-gray-500 dark:text-gray-400">{placeholder}</span>
                        ) : (
                            <span>{value}</span>
                        )}
                        <div className="ml-auto cursor-pointer">
                            {value !== '' && (
                                <span
                                    className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        clear();
                                    }}
                                >
                                    <X className="h-3 w-3" />
                                </span>
                            )}
                        </div>
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 z-10" align="start">
                <Command>
                    <CommandInput placeholder="Tìm kiếm tỉnh thành..." className="h-9" />
                    <CommandEmpty>Không tìm thấy tỉnh thành nào.</CommandEmpty>
                    <CommandList className="max-h-[300px]">
                        <CommandGroup>
                            {provinces?.data.map((province) => (
                                <CommandItem
                                    key={province.id}
                                    value={province.name}
                                    onSelect={() => handleSelect(province.name)}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <div
                                        className={cn(
                                            "flex h-4 w-4 items-center justify-center rounded border border-primary",
                                            value.includes(province.name)
                                                ? "bg-primary text-primary-foreground"
                                                : "opacity-50"
                                        )}
                                    >
                                        {value.includes(province.name) && <div className="h-2 w-2 bg-current rounded" />}
                                    </div>
                                    <span>{province.name}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
});

LocationSelect.displayName = 'LocationSelect';

interface JobSearchBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    location: string;
    onLocationChange: (value: string) => void;
    className?: string;
}

const JobSearchBar = React.memo(({
    searchTerm,
    onSearchChange,
    location,
    onLocationChange,
    className
}: JobSearchBarProps) => {
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value);
    }, [onSearchChange]);

    return (
        <div className={cn(
            "mb-5 mx-auto max-w-6xl rounded-2xl border border-gray-200/50 bg-white/80 p-8 dark:border-gray-700/50 dark:bg-gray-800/80",
            className
        )}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Search Input */}
                <div className="relative sm:col-span-1 lg:col-span-3">
                    <Search className="absolute top-4 left-4 h-5 w-5 text-gray-400 dark:text-gray-500 z-10" />
                    <Input
                        placeholder="Tìm kiếm: React, Python, DevOps..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="h-14 rounded-xl border-gray-200 bg-gray-50 pl-12 text-lg text-gray-900 placeholder-gray-500 focus:border-cyan-500 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-400"
                    />
                </div>

                {/* Location Select */}
                <div className="relative">
                    <LocationSelect
                        value={location}
                        onChange={onLocationChange}
                        placeholder="Địa điểm"
                    />
                </div>
            </div>

        </div>
    );
});

JobSearchBar.displayName = 'JobSearchBar';

export default JobSearchBar;