import { Search, X, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useMemo, useState } from "react"
import FilterRadioGroup from "./filterRadioGroup"
import { useQuery } from "@tanstack/react-query"
import { useSkillService } from "@/service/skill.service"
import { MAX_PAGE_SIZE } from "@/constants"


const SALARY_MAPPING = {
    '0-15': { min: "", max: "15000000" },
    '15-25': { min: "15000000", max: "25000000" },
    '25-35': { min: "25000000", max: "35000000" },
    '35-50': { min: "35000000", max: "50000000" },
    '50+': { min: "50000000", max: "" },
}

interface FilterSideProps {
    skills: string[];
    onSkillChange: (skills: string[]) => void;
    minSalary: string;
    onMinSalaryChange: (salary: string) => void;
    maxSalary: string;
    onMaxSalaryChange: (salary: string) => void;
    level: string;
    onLevelChange: (value: string) => void;
    jobType: string;
    onJobTypeChange: (value: string) => void;
}

const FilterSide = ({ skills, onSkillChange, level, onLevelChange, jobType, onJobTypeChange, minSalary, onMinSalaryChange, maxSalary, onMaxSalaryChange }: FilterSideProps) => {
    const [skillSearchTerm, setSkillSearchTerm] = useState("")
    const { getSkills } = useSkillService();

    const { data: listSkills } = useQuery({
        queryKey: ['user-skills'],
        queryFn: () => getSkills({ size: MAX_PAGE_SIZE.toString() }),
    });

    const currentSalaryRange = useMemo(() => {
        for (const [key, value] of Object.entries(SALARY_MAPPING)) {
            if (value.min === minSalary.toString() && value.max === maxSalary.toString()) {

                return key;
            }
        }

        return "";
    }, [minSalary, maxSalary]);

    const filteredSkills = useMemo(() => {
        if (!listSkills?.data) return [];

        if (skillSearchTerm.trim() === '') return listSkills.data;

        return listSkills.data.filter((skill) =>
            skill.name.toLowerCase().includes(skillSearchTerm.trim().toLowerCase())
        )
    }, [listSkills?.data, skillSearchTerm])

    const handleSkillToggle = (skill: string) => {
        if (skills.includes(skill)) {
            onSkillChange(skills.filter((s) => s !== skill))
        } else {
            onSkillChange([...skills, skill])
        }
    }

    const removeSkill = (skill: string) => {
        onSkillChange(skills.filter((s) => s !== skill))
    }

    const clearAllFilters = () => {
        onMinSalaryChange("")
        onMaxSalaryChange("")
        onLevelChange("")
        onJobTypeChange("")
        onSkillChange([])
        setSkillSearchTerm("")
    }

    const getActiveFilterCount = () => {
        return (
            (currentSalaryRange ? 1 : 0) +
            (level ? 1 : 0) +
            (jobType ? 1 : 0) +
            skills.length
        )
    }

    const handleSalaryChange = (value: any) => {
        if (value && SALARY_MAPPING[value as keyof typeof SALARY_MAPPING]) {
            const mapping = SALARY_MAPPING[value as keyof typeof SALARY_MAPPING];
            onMinSalaryChange(mapping.min);
            onMaxSalaryChange(mapping.max);
        } else {
            onMinSalaryChange("");
            onMaxSalaryChange("");
        }
    }

    const jobTypes = useMemo(
        () => [
            { label: "Full-time", value: "FULL_TIME" },
            { label: "Part-time", value: "PART_TIME" },
            { label: "Internship", value: "INTERNSHIP" },
            { label: "Freelance", value: "FREELANCE" },
            { label: "Remote", value: "REMOTE" },
        ],
        [],
    );
    const salaryRanges = useMemo(
        () => [
            { label: "Dưới 15 triệu", value: "0-15" },
            { label: "15-25 triệu", value: "15-25" },
            { label: "25-35 triệu", value: "25-35" },
            { label: "35-50 triệu", value: "35-50" },
            { label: "Trên 50 triệu", value: "50+" },
        ],
        [],
    );
    const jobLevels = useMemo(
        () => [
            { label: "Intern", value: "INTERN" },
            { label: "Fresher", value: "FRESHER" },
            { label: "Junior", value: "JUNIOR" },
            { label: "Mid", value: "MID" },
            { label: "Senior", value: "SENIOR" },
            { label: "Lead", value: "LEAD" },
        ],
        [],
    );

    return (
        <aside className="w-full lg:w-80 space-y-4">
            <Card className="shadow-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                            <Filter className="h-5 w-5 text-cyan-600" />
                            Bộ lọc tìm kiếm
                            {getActiveFilterCount() > 0 && (
                                <Badge className="bg-cyan-100 text-cyan-700 text-xs px-2 py-1 dark:bg-cyan-900 dark:text-cyan-300">
                                    {getActiveFilterCount()}
                                </Badge>
                            )}
                        </CardTitle>
                        {getActiveFilterCount() > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearAllFilters}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* --- KỸ NĂNG --- */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                            Kỹ năng công nghệ
                        </h3>

                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Tìm kiếm kỹ năng..."
                                value={skillSearchTerm}
                                onChange={(e) => setSkillSearchTerm(e.target.value)}
                                className="pl-10 h-10 text-sm border-gray-300 focus:border-cyan-500 dark:border-gray-600"
                            />
                        </div>

                        {skills.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Đã chọn:</p>
                                <div className="flex flex-wrap gap-1">
                                    {skills.map((skill) => (
                                        <Badge
                                            key={skill}
                                            className="bg-cyan-500 text-white hover:bg-cyan-600 cursor-pointer text-xs px-2 py-1"
                                            onClick={() => removeSkill(skill)}
                                        >
                                            {skill}
                                            <X className="h-3 w-3 ml-1" />
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-1 max-h-40 overflow-y-auto">
                            {filteredSkills && filteredSkills.map((skill) => (
                                <Badge
                                    key={skill.id}
                                    variant={skills.includes(skill.name) ? "default" : "outline"}
                                    className={`cursor-pointer text-xs px-2 py-1 ${skills.includes(skill.name)
                                        ? "bg-cyan-500 text-white"
                                        : "border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                        }`}
                                    onClick={() => handleSkillToggle(skill.name)}
                                >
                                    {skill.name}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    {/* --- MỨC LƯƠNG --- */}
                    <FilterRadioGroup
                        title="Mức lương"
                        color="bg-green-500"
                        value={currentSalaryRange}
                        options={salaryRanges}
                        onChange={handleSalaryChange}
                    />

                    <Separator />

                    {/* --- CẤP ĐỘ --- */}
                    <FilterRadioGroup
                        title="Cấp độ"
                        color="bg-purple-500"
                        value={level}
                        options={jobLevels}
                        onChange={onLevelChange}
                    />

                    <Separator />

                    {/* --- LOẠI HÌNH --- */}
                    <FilterRadioGroup
                        title="Loại hình"
                        color="bg-orange-500"
                        value={jobType}
                        options={jobTypes}
                        onChange={onJobTypeChange}
                    />
                </CardContent>
            </Card>
        </aside>
    )
}

export default FilterSide
