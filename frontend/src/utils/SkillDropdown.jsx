import React from 'react';

const SkillDropdown = ({ id, name, value, onChange }) => {
    const skills = [
        'Web development',
        'Graphic design',
        'Content creation',
        'Content writing',
        'Video editing',
        'End-to-end-projects',
        'Digital marketing'
    ];

    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
                Skills
            </label>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-darkBlue"
                required
            >
                <option value="">Select your skill</option>
                {skills.map((skill, index) => (
                    <option key={index} value={skill}>
                        {skill}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SkillDropdown;
